import fs from 'fs/promises';
import path from 'path';

function isFunction(e) {
    return typeof e === "function";
}

function isNumber(val) {
    let type = typeof val;
    return (type === "number" || type === "string") &&
        !isNaN(obj - parseFloat(obj));
}

function isEmpty(val) {
    let type = typeof val;
    return type === "undefined" || (type === "string" && val.length === 0) || val === null;
}

function newUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, a => (a^Math.random() * 16 >> a / 4).toString(16));
}

async function readImageToBase64Async(imagePath) {
    const buffer = await fs.readFile(imagePath);
    return buffer.toString('base64');
}

async function saveBase64ImageAsync(base64Data, imagePath) {
    if(!base64Data) {
        return;
    }
    let index = base64Data.indexOf(",");
    if(index > -1) {
        base64Data = base64Data.substring(index + 1);
    }
    // 创建Buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // 确保目录存在
    const dir = path.dirname(imagePath);
    await fs.mkdir(dir, { recursive: true });
    
    // 写入文件(自动覆盖)
    await fs.writeFile(imagePath, buffer);
}

async function readTextToJsonAsync(relativePath) {
    const absPath = path.resolve(process.cwd(), relativePath);
    const content = await fs.readFile(absPath, "utf-8");
    if(!content) {
        return null;
    }
    return JSON.parse(content);
}

async function writeJsonToFileAsync(relativePath, jsonObj) {
    const absPath = path.resolve(process.cwd(), relativePath);
    const jsonStr = JSON.stringify(jsonObj, null, 2);
    await fs.writeFile(absPath, jsonStr, 'utf-8');
}

async function getAllFilePathsAsync(dir, justCurrent = false, filterExtensions = []) {
    if (typeof dir !== 'string') {
        throw new Error('The first argument must be a string representing the directory path.');
    }

    if(typeof filterExtensions === 'string') {
        filterExtensions = [filterExtensions];
    }
    if (!Array.isArray(filterExtensions)) {
        filterExtensions = [];
    }
    const stack = [dir];
    let results = [];
    while (stack.length > 0) {
        const currentDir = stack.pop();
        const files = await fs.readdir(currentDir);
        for(let i = 0; i < files.length; i++) {
            let file = files[i];
            const filePath = path.join(currentDir, file);
            const stat = await fs.stat(filePath);
            if (stat && stat.isDirectory() &&!justCurrent) {
                stack.push(filePath);
            } else {
                const ext = path.extname(file);
                if(filterExtensions.length === 0) {
                    results.push(filePath);
                } else if (filterExtensions.includes(ext)) {
                    results.push(filePath);
                }
            }
        }
    }
    return results;
}

function getFileName(filePath) {
    let extname = path.extname(filePath)
    return {
        basename: path.basename(filePath, extname),
        extname
    };
}

function resolvePath(relativePath) {
    return path.resolve(process.cwd(), relativePath);
}

export {
    isFunction,
    isNumber,
    isEmpty,
    newUUID,
    readImageToBase64Async,
    saveBase64ImageAsync,
    readTextToJsonAsync,
    writeJsonToFileAsync,
    getAllFilePathsAsync,
    resolvePath,
    getFileName
}