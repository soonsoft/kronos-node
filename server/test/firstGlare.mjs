// 图像处理工具函数

// 加载 OpenCV.js
let cvPromise = null;
export function loadCV() {
    if (!cvPromise) {
        cvPromise = new Promise((resolve) => {
            // 动态加载 OpenCV.js
            const script = document.createElement('script');
            script.src = 'https://docs.opencv.org/4.8.0/opencv.js';
            script.async = true;
            script.onload = () => {
                cv['onRuntimeInitialized'] = () => {
                    resolve(cv);
                };
            };
            document.head.appendChild(script);
        });
    }
    return cvPromise;
}

/**
 * 检测图片中的反光区域并标记
 * @param {string} base64Image Base64编码的图片数据
 * @returns {Promise<{base64: string, hasGlare: boolean}>} 处理后的图片和是否存在反光
 */
export async function detectAndMarkGlare(base64Image) {
    const cv = await loadCV();
    
    // 将base64转换为图像数据
    const img = await createImageFromBase64(base64Image);
    
    // 创建OpenCV矩阵
    const src = cv.imread(img);
    const dst = new cv.Mat();
    
    try {
        // 转换为HSV颜色空间
        cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB);
        cv.cvtColor(dst, dst, cv.COLOR_RGB2HSV);
        
        // 创建掩码来检测高亮区域（高饱和度低明度的区域）
        const low = new cv.Mat(dst.rows, dst.cols, dst.type(), [0, 0, 200, 0]);
        const high = new cv.Mat(dst.rows, dst.cols, dst.type(), [180, 30, 255, 255]);
        
        // 应用阈值
        const mask = new cv.Mat();
        cv.inRange(dst, low, high, mask);
        
        // 进行形态学操作来去除噪点
        const kernel = cv.Mat.ones(5, 5, cv.CV_8U);
        const morphed = new cv.Mat();
        cv.morphologyEx(mask, morphed, cv.MORPH_CLOSE, kernel);
        cv.morphologyEx(morphed, morphed, cv.MORPH_OPEN, kernel);
        
        // 找到轮廓
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(morphed, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
        
        // 在原图上绘制矩形
        const result = cv.imread(img);
        let hasGlare = false;
        
        for (let i = 0; i < contours.size(); i++) {
            const cnt = contours.get(i);
            const area = cv.contourArea(cnt);
            
            // 过滤小区域
            if (area > 100) {
                const rect = cv.boundingRect(cnt);
                const point1 = new cv.Point(rect.x, rect.y);
                const point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
                cv.rectangle(result, point1, point2, [255, 0, 0, 255], 2);
                hasGlare = true;
            }
            cnt.delete();
        }
        
        // 转换回base64
        const canvas = document.createElement('canvas');
        cv.imshow(canvas, result);
        const outputBase64 = canvas.toDataURL('image/png');
        
        // 清理内存
        src.delete();
        dst.delete();
        mask.delete();
        morphed.delete();
        contours.delete();
        hierarchy.delete();
        kernel.delete();
        low.delete();
        high.delete();
        result.delete();
        
        return {
            base64: outputBase64,
            hasGlare: hasGlare
        };
    } catch (error) {
        // 清理内存
        src.delete();
        dst.delete();
        throw error;
    }
}

// 辅助函数：从base64创建图像
function createImageFromBase64(base64) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = base64;
    });
}
