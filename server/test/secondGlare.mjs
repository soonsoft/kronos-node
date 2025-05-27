function detectAndMarkGlare() {
    // 步骤 1：预处理与高亮区域检测
    const cv = require('@u4/opencv4nodejs');

    // 读取图像并转换到HSV空间
    const image = cv.imread('input.jpg');
    const hsv = image.cvtColor(cv.COLOR_BGR2HSV);
    const [h, s, v] = hsv.split();

    // 检测高亮区域（V通道阈值）
    const { maxVal } = v.minMaxLoc();
    const brightnessThreshold = maxVal * 0.9; // 取亮度前10%的区域
    const mask = v.threshold(brightnessThreshold, 255, cv.THRESH_BINARY);

    // 步骤 2：形态学处理优化区域
    // 消除小噪点
    const kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(5,5));
    const cleanedMask = mask
            .morphologyEx(kernel, cv.MORPH_OPEN)  // 开运算去噪
            .morphologyEx(kernel, cv.MORPH_CLOSE); // 闭运算填充空洞


    // 步骤 3：提取候选区域特征
    const contours = cleanedMask.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    contours.forEach((contour, i) => {
        const area = contour.area;
        if (area < 50) return; // 忽略过小区域

        // 获取包围盒与ROI
        const rect = contour.boundingRect();
        const roi = image.getRegion(rect);
        
        // 特征1：饱和度分析
        const meanSaturation = s.getRegion(rect).mean().w;

        // 特征2：边缘梯度强度
        const sobelX = roi.sobel(cv.CV_64F, 1, 0);
        const edgeStrength = sobelX.abs().mean().w;

        // 特征3：亮度衰减特征（中心到边缘的梯度）
        const distanceMap = cv.Mat.zeros(roi.rows, roi.cols, cv.CV_64F);
        const center = new cv.Point(roi.cols/2, roi.rows/2);
        distanceMap.apply((i,j) => 
            Math.sqrt((j-center.x)**2 + (i-center.y)**2)
        );
        const brightnessGradient = cv.correlate(v.getRegion(rect), distanceMap)
            .div(distanceMap.sum()).w;

        // 分类判断
        const isLightSource = (
            meanSaturation < 30 &&       // 低饱和度
            edgeStrength < 15 &&         // 边缘模糊
            brightnessGradient > 0.8     // 中心亮度衰减明显
        );

        console.log(`区域 ${i}: ${isLightSource ? '光源' : '白色物体'}`);
    });
}