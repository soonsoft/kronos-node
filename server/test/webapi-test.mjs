import path from "path";
import { fileURLToPath } from "url";
import { readImageToBase64Async } from "../src/utils.mjs";
import { detectGlareBase64 } from "../src/webApi.mjs";

const __filename = path.resolve(fileURLToPath(import.meta.url), "../../../");

function test_detectGlareBase64() {
    const imageFilename = path.resolve(__filename, "./datasets/images/1.png");
    readImageToBase64Async(imageFilename)
        .then(imageBase64 => {
            detectGlareBase64(imageBase64, null, {
                LOWER_THRESHOLD: [0, 0, 230],
                UPPER_THRESHOLD: [180, 30, 255],
                GAUSSIAN_BLUR_SIZE: [3, 3],
                MORPH_KERNEL_SIZE: [3, 3],
                MIN_AREA: 10,
                RECTANGLE_COLOR: [0, 0, 255],
                RECTANGLE_THICKNESS: 1
            }).then(json => {
                console.log(json);
            }).catch(e => console.log(e));
        });
}

export {
    test_detectGlareBase64
}