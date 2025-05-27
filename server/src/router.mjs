import path from 'path';
import Router from '@koa/router';
import { detectGlareBase64, detectGlareBase64_V2 } from './webApi.mjs';
import { writeJsonToFileAsync, getAllFilePathsAsync, readImageToBase64Async, saveBase64ImageAsync, resolvePath, getFileName, readTextToJsonAsync } from './utils.mjs';

const router = new Router();

// 业务路由
router.get('/error', () => {
  throw new HttpException(400, 'Demo Error');
});

router.get('/login', function handleLogout(ctx) {
    ctx.session = null;
    ctx.redirect('/');
});

router.get('/logout', function handleLogout(ctx) {
    ctx.session = null;
    ctx.redirect('/');
});

router.post('/dataset/glare/options/load', async ctx => {
    try {
        let param = await readTextToJsonAsync('./server/resource/param/glare-options.json');
        ctx.body = {
            code: 0,
            data: param
        };
    } catch(e) {
        console.error("Read options Error: ", e);
        ctx.body = {
            code: 500,
            message: e.message
        };
    }
});

router.post('/dataset/glare/options/save', async ctx => {
    let requestData = ctx.request.body;
    if(!requestData) {
        requestData = [];
    }
    try {
        await writeJsonToFileAsync('./server/resource/param/glare-options.json', requestData);
        ctx.body = {
            code: 0,
            message: "Options saved successfully"
        };
    } catch (error) {
        console.error("Error writing options to file:", error);
        ctx.body = {
            code: 500,
            message: error.message
        };
    }
});

router.post('/dataset/glare/call', async ctx => {
    let param = ctx.request.body;
    const datasetPath = `./datasets/images/${param.paramId}`;
    let imageDirectoryPath = resolvePath(datasetPath);
    let allImages = await getAllFilePathsAsync(imageDirectoryPath, true, [".jpg", ".jpeg", ".png"]);

    let successInfo = {};
    let failureInfo = {};
    for(let i = 0; i < allImages.length; i++) {
        let imagePath = allImages[i];
        let { basename, extname } = getFileName(imagePath);
        try {
            let imageBase64 = await readImageToBase64Async(imagePath);
            let result = await detectGlareBase64_V2(imageBase64, `${basename}${extname}`, param);
            if(result.code === 0) {
                let resultPath = path.join(datasetPath, basename);
                await saveBase64ImageAsync(result.image, path.join(resultPath, `${basename}-source${extname}`));
                await saveBase64ImageAsync(result.imageMark, path.join(resultPath, `${basename}-mark${extname}`));
                await writeJsonToFileAsync(path.join(resultPath, `${basename}-traits.json`), result.traits);
                successInfo[basename] = {
                    resultPath
                };
            } else {
                failureInfo[basename] = {
                    message: result.message
                };
            }
        } catch(e) {
            failureInfo[basename] = {
                message: e.message
            };
        }
    }

    ctx.body = {
        imageCount: allImages.length,
        successInfo,
        failureInfo
    };
});

export { router };
