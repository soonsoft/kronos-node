import config from './config.mjs';
import { newUUID } from './utils.mjs';

/**
 * 
 * @param {*} sourceImage base64 String of Image
 * @param {*} filename the fileName of Image
 * @param {*} params the Glare parameters, like
 * {
        'LOWER_THRESHOLD': [0, 0, 230],  # HSV下界
        'UPPER_THRESHOLD': [180, 30, 255],  # HSV上界
        'GAUSSIAN_BLUR_SIZE': (3, 3),  # 高斯模糊核大小
        'MORPH_KERNEL_SIZE': (3, 3),  # 形态学操作核大小
        'MIN_AREA': 10,  # 最小反光区域面积
        'RECTANGLE_COLOR': (0, 0, 255),  # 矩形框颜色
        'RECTANGLE_THICKNESS': 1  # 矩形框粗细
    }
 * @returns the JSON response
 */
async function detectGlareBase64(sourceImage, filename, params) {
    let url = `http://${config.visionServer.HOST}/api/opencv/service/detectGlareBase64`;

    const body = {
        fileBase64: sourceImage,
        fileName: filename || `${newUUID()}.png`,
        param: params
    };

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(response.ok) {
        return await response.json();
    }

    return {
        code: 9999,
        status: response.status,
        statusText: response.statusText,
        message: await response.text()
    };
}

async function detectGlareBase64_V2(sourceImage, filename, params) {
    let url = `http://${config.visionServer.LOCALHOST}/glare`;

    const body = {
        fileBase64: sourceImage,
        fileName: filename || `${newUUID()}.png`,
        param: params
    };

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(response.ok) {
        let json = await response.json();
        return {
            code: 0,
            image: json.data.image,
            imageMark: json.data.imageMark,
            traits: json.data.traits
        };
    }

    return {
        code: 9999,
        status: response.status,
        statusText: response.statusText,
        message: await response.text()
    };
}

export {
    detectGlareBase64,
    detectGlareBase64_V2
};