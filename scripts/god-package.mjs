import path from "path";
import { fileURLToPath } from 'url';
import { readFile, readFilesContent, getAllFilePaths, saveFile } from './file-loader.mjs';

const __dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const GodModeTemplatePath = path.resolve(__dirname, '../frontend/template/god-mode-template.js');
let templateContent = readFile(GodModeTemplatePath);

//#region resources

const ResourcesPath = path.resolve(__dirname, '../frontend/template/common/resources.js');
let resourceContents = readFilesContent([ ResourcesPath ]);
templateContent = templateContent.replace('// {{resources}} //', resourceContents);

//#endregion

//#region common

const CommonPath = path.resolve(__dirname, '../frontend/template/common/dom-api.js');
let commonContents = readFilesContent([ CommonPath ]);
templateContent = templateContent.replace('// {{common}} //', commonContents);

//#endregion

//#region http

const HttpPath = path.resolve(__dirname, '../frontend/template/http/http.js');
let httpContents = readFilesContent([ HttpPath ]);
templateContent = templateContent.replace('// {{http}} //', httpContents);

//#endregion

//#region modules

const GodModulePath = path.resolve(__dirname, '../frontend/modules');
let modulePaths = getAllFilePaths(GodModulePath);
let moduleContents = readFilesContent(modulePaths, ';\r\n\r\n');
templateContent = templateContent.replace('// {{modules}} //', moduleContents);

//#endregion

//#region renders

const RenderPath = path.resolve(__dirname, '../frontend/template/render');
let renderPaths = getAllFilePaths(RenderPath);
let renderContents = readFilesContent(renderPaths, ';\r\n\r\n');
templateContent = templateContent.replace('// {{renders}} //', renderContents);

//#endregion

//#region style

const GodStylePath = path.resolve(__dirname, '../frontend/style/style.css');
let styleContent = readFile(GodStylePath);
templateContent = templateContent.replace('// {{css-style}} //', styleContent);

//#endregion

const DistPath = path.resolve(__dirname, '../client/scripts/webui.js');
saveFile(DistPath, templateContent);

console.log("package is done.")
