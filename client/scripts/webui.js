;(function() {
    const IdSymbol = Symbol("Id");

    const defaultIcon = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgc3R5bGU9IndpZHRoOiAxZW07aGVpZ2h0OiAxZW07dmVydGljYWwtYWxpZ246IG1pZGRsZTtmaWxsOiBjdXJyZW50Q29sb3I7b3ZlcmZsb3c6IGhpZGRlbjsiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwLWlkPSIzNDQwIj48cGF0aCBkPSJNOTM3LjA2MiA2MjEuNjg4IDEwMjQgNjIxLjY4OCAxMDI0IDQwMi4yNWwtODYuOTM4IDBjLTg4LjE4OCAwLTEwOS4xODgtNTAuOTM4LTQ3LTExMy4xODhsNjEuNTYyLTYxLjU2Mi0xNTUuMTg4LTE1NS4xMjYtNjEuNSA2MS41Yy02Mi4zMTIgNjIuMzEyLTExMy4zMTIgNDEuMTg4LTExMy4xMjYtNDYuODc2IDAtMC4yNS0wLjEyNi0wLjM3Ni0wLjEyNi0wLjU2Mkw2MjEuNjg0IDAgNDAyLjM0NCAwbDAgODcuMjVjLTAuMjUgODcuODc2LTUxLjA2MiAxMDguODc2LTExMy4yODIgNDYuNjI2bC02MS41MzItNjEuNUw3Mi40MDYgMjI3LjVsNjEuNSA2MS41NjJjNjIuMjgyIDYyLjI1IDQxLjE1NiAxMTMuMTg4LTQ2Ljg3NiAxMTMuMTg4TDAgNDAyLjI1bDAgMjE5LjQzOCA4Ny4wMzIgMGM4OC4wMzIgMCAxMDkuMTU2IDUwLjkzOCA0Ni44NzYgMTEzLjI1bC02MS41IDYxLjUgMTU1LjEyNiAxNTUuMTg4IDYxLjUzMi02MS41NjJjNjIuMjE4LTYyLjE4OCAxMTMuMDMyLTQxLjE4OCAxMTMuMjgyIDQ2LjYyNkw0MDIuMzQ4IDEwMjRsMjE5LjM0NCAwIDAtODYuNDM4YzAtMC4xODggMC4xMjYtMC4zNzYgMC4xMjYtMC41NjItMC4xODgtODguMDYyIDUwLjgxMi0xMDkuMTI2IDExMy4xMjYtNDYuOTM4bDYxLjUgNjEuNTYyIDE1NS4xODgtMTU1LjE4OC02MS41NjItNjEuNUM4MjcuODc2IDY3Mi42MjYgODQ4Ljg3NiA2MjEuNjg4IDkzNy4wNjIgNjIxLjY4OHpNNTEyIDcwNGMtMTA2LjAzMiAwLTE5Mi04Ni0xOTItMTkyczg1Ljk2OC0xOTIgMTkyLTE5MmMxMDYgMCAxOTIgODYgMTkyIDE5MlM2MTggNzA0IDUxMiA3MDR6IiBwLWlkPSIzNDQxIj48L3BhdGg+PC9zdmc+";

const theme = {
    backgroundImage: "url('https://ts1.tc.mm.bing.net/th?id=OHR.MountHamilton_EN-CN0015074360_1920x1080.webp')",
    primaryColor: "rgb(16, 150, 239)",
    fontColor: "#000000",
    panelColor: "rgba(255, 255, 255, .4)",
    panelFontColor: "#000000",
    panelBorderColor: "#000000",
    menuItemIconBgColor: "rgba(255, 255, 255, .5)",
    menuItemHoverColor: "rgba(255, 255, 255, .2)",
    menuItemSelectedColor: "rgba(255, 255, 255, .4)",
    buttonBgColor: "rgba(255, 255, 255, 1)",
    buttonActiveBgColor: "#000000",
    starColor: "#cf0842",
    textboxBorderColor: "#666666",
    basicBgColor: "#ffffff",
    basicFtColor: "#000000"
};

    function loadJS(src, callback) {
    const script = document.createElement("script");
    script.onload = callback;
    script.src = src;
    document.body.appendChild(script);
}

function ready(fn, immediate) {
    let doReady = () => {
        if(isFunction(fn)) {
            fn();
        } else if(Array.isArray(fn)) {
            fn.forEach(i => {
                if(isFunction(i)) {
                    i();
                }
            });
        }
    };
    if(immediate) {
        doReady();
    } else {
        on("DOMContentLoaded", doReady);
    }
}

function getCookie(cookieName) {
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            //处理加号
            return decodeURIComponent(s.replace(/\+/g, ' '));
        } catch (e) {
            return s;
        }
    }

    let pairs = String(document.cookie).split(/; */);
    for(let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];
        let index = pair.indexOf('=');
        if (index === -1) {
            continue;
        }
        let key = pair.substring(0, index).trim();
        if(key === cookieName) {
            let val = pair.substring(++index, pair.length).trim();
            return parseCookieValue(val)
        }
    }
    return null;
}

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

function convertDataAttr(str) {
    if(isEmpty(str)) {
        return "";
    }

    let parts = ["data"];
    let startIndex = 0;
    let strLength = str.length;
    for(let i = 0; i < strLength; i++) {
        let c = str.charAt(i);
        if(c >= "A" && c <= "Z") {
            if(i > startIndex) {
                parts.push(str.substring(startIndex, i).toLowerCase());
            }
            startIndex = i;
        }
    }
    if(startIndex < strLength) {
        parts.push(str.substring(startIndex, strLength).toLowerCase());
    }
    return parts.join("-");
}

function splitText(str, split) {
    if(isEmpty(str)) {
        return [];
    }
    str += "";
    let arr = str.split(split || ",");
    let result = [];
    arr.forEach(e => {
        let val = e.trim();
        if(val) {
            result.push(val);
        }
    });
    return result;
}

function on(element, eventName, eventFn) {
    if(isFunction(eventName)) {
        eventFn = eventName;
    }
    if(typeof element === "string") {
        eventName = element;
        element = null;
    }
    if(!element) {
        element = document;
    }
    element.addEventListener(eventName, eventFn, false);
}

function off(element, eventName, eventFn) {
    if(isFunction(eventName)) {
        eventFn = eventName;
    }
    if(typeof element === "string") {
        eventName = element;
        element = null;
    }
    if(!element) {
        element = document;
    }
    element.removeEventListener(eventName, eventFn);
}

function appendHtml(elem, html) {
    if(typeof elem === "string") {
        html = elem;
        elem = document.body;
    }

    // beforebegin - 元素自身前面，
    // afterend - 元素自身后面，
    // afterbegin - 元素内部第一个元素前面，
    // beforeend - 元素内部最后一个子节点后面
    elem.insertAdjacentHTML("beforeend", html);
}

function replaceHtml(elem, html) {
    elem.replaceChildren([])
    appendHtml(elem, html);
}

function html(strings, ...keys) {
    return (...values) => {
        const result = [strings[0]];
        const dict = values[values.length - 1] || {};
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        }
        return result.join("");
    };
}

function htmlCondition(predicate, val, fn) {
    if(isFunction(predicate)) {
        if(predicate(val)) {
            return isFunction(fn) ? fn(val) : fn;
        }
    } else {
        if(!!predicate) {
            return isFunction(val) ? val() : fn(val);
        }
    }
    return "";
}

function nextTick(fn) {
    return setTimeout(fn);
}

function generateId() {
    if(!godInfo[IdSymbol]) {
        godInfo[IdSymbol] = 0;
    }
    godInfo[IdSymbol]++;
    return godInfo[IdSymbol];
}

function saveAs(blob, filename) {
    let alink = document.createElement("a");
    alink.style = "margin-left: -100px";
    document.body.appendChild(alink);
    alink.download = filename || "download-file.unknown";
    alink.href = URL.createObjectURL(blob);
    alink.click();
    document.body.removeChild(alink);
}

function readTextFile(blob, encoding) {
    return new Promise((resolve, reject) => {
        if(!blob || !(blob instanceof Blob)) {
            resolve(null);
            return;
        }
        try {
            let fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                resolve(fileReader.result);
            }, false);
            fileReader.readAsText(blob, encoding || "UTF-8");
        } catch(e) {
            reject(e);
        }
    });
}

    const godInfo = {
        version: "1.0.0",
        theme: theme,
        http: {
            host: "",
            carryCookie: true
        },
        ui: {
            onClosed: module => {
                if(isFunction(module)) {
                    godInfo.addEventListener("closed", module);
                } else {
                    godInfo.dispatchEvent("closed", module);
                }
            },
            onOpened: module => {
                if(isFunction(module)) {
                    godInfo.addEventListener("opend", module);
                } else {
                    godInfo.dispatchEvent("opend", module);
                }
            }
        },
        events: {},
        addEventListener: (name, fn) => {
            if(!isFunction(fn)) {
                return;
            }
            let callbackArr = godInfo.events[name];
            if(!callbackArr) {
                callbackArr = [];
                godInfo.events[name] = callbackArr;
            }
            for(let i = 0; i < callbackArr.length; i++) {
                if(callbackArr[i] === fn) {
                    return;
                }
            }
            callbackArr.push(fn);
        },
        dispatchEvent: (name, obj) => {
            if(isEmpty(name)) {
                return;
            }
            const callbackArr = godInfo.events[name];
            if(Array.isArray(callbackArr)) {
                callbackArr.forEach(fn => fn(obj));
            }
        },
        modules: [],
        registerModule: (module) => {
            godInfo.modules.push(module);
        }
    };

    godInfo.registerModule({
    menuText: "选项管理器",
    onOpened: ctx => {
        let scopeInfo = ctx.getScopeInfo();
        scopeInfo.options = [];
        ctx.callAction("getOptions", {
            data: scopeInfo.options
        });
    },
    properties: [
        { 
            id: "openFile", 
            type: "file", 
            label: "打开文件", 
            action: ctx => {
                let fileInput = ctx.element;
                let files = fileInput.files;
                if(files.length === 0) {
                    fileInput.value = "";
                    ctx.jsonRender("没有选中文件");
                    return;
                }

                const reader = new FileReader();
                reader.onload = () => {
                    let fileContent = reader.result;
                    try {

                    } catch(e) {
                        ctx.jsonRender(fileContent);
                    }
                };
                reader.onerror = () => {
                    ctx.jsonRender("读取文件失败");
                };
                reader.readAsText(files[0]);
            }
        },
        { type: "---" },
        {
            id: "area", 
            label: "反光区域面积", 
            type: "number", 
            required: true, 
            value: 600, 
            min: 500, 
            step: 100,
            convertor: val => parseFloat(val, 10)
        },
        {
            id: "meanSaturation", 
            label: "色彩饱和度（一般不用调整）", 
            required: true, 
            type: "number", 
            value: 30, 
            min: 0, 
            max: 255, 
            step: 1,
            convertor: val => parseFloat(val, 10)
        },
        {
            id: "edgeStrength", 
            label: "边缘强度", 
            type: "number", 
            required: true, 
            value: 15, 
            min: 0, 
            max: 255, 
            step: 1,
            convertor: val => parseFloat(val, 10)
        },
        {
            id: "brightnessGradient", 
            label: "中心亮度衰减", 
            type: "number", 
            required: true, 
            value: 0.8, 
            min: 0, 
            max: 255, 
            step: 1,
            convertor: val => parseFloat(val, 10)
        }
    ],
    actions: [
        {
            actionName: "getOptions",
            action: ctx => {
                let data = ctx.param.data;
                if(!Array.isArray(data) || data.length === 0) {
                    ctx.jsonRender({
                        code: 0,
                        message: "暂无数据",
                        data: {
                            name: "暂无数据",
                            options: []
                        }
                    });
                    return;
                }
                ctx.tableRender([
                        { text: "#", align: "right", width: 40, formatter: (_, op) => op.rowIndex + 1 },
                        { text: "反光区域面积", column: "area" },
                        { text: "色彩饱和度", column: "meanSaturation" },
                        { text: "边缘强度", column: "edgeStrength" },
                        { text: "中心亮度衰减", column: "brightnessGradient" },
                        {
                            text: "操作", 
                            width: 100, 
                            align: "center",
                            formatter: (_, op) => {
                                return [
                                    ctx.createLinkButton("remove", "删除", { rowIndex: op.rowIndex })
                                ];
                            }
                        }
                    ],
                    data
                );
            }
        },
        {
            text: "添加",
            action: async ctx => {
                if(ctx.checkCurrentViewModel().invalid(v => ctx.jsonRender(v.messages))) {
                    return;
                }
                let vm = ctx.getCurrentViewModel();
                let scopeInfo = ctx.getScopeInfo();
                if(!Array.isArray(scopeInfo.options)) {
                    scopeInfo.options = [];
                }
                paramId = scopeInfo.options.length + 1;
                vm.paramId = paramId < 10 ? "0" + paramId : paramId + "";
                scopeInfo.options.push(vm);
                ctx.callAction("getOptions", {
                    data: scopeInfo.options
                });
            }
        },
        {
            actionName: "remove",
            action: ctx => {
                let scopeInfo = ctx.getScopeInfo();
                if(!Array.isArray(scopeInfo.options) || scopeInfo.options.length === 0) {
                    return;
                }
                let rowIndex = ctx.getElementData("rowIndex");
                if(confirm("删除后数据将无法恢复，是否确定删除？")) {
                    scopeInfo.options.splice(rowIndex, 1);
                    ctx.callAction("getOptions", {
                        data: scopeInfo.options
                    });
                }
            }
        },
        {
            text: "保存",
            action: async ctx => {
                let scopeInfo = ctx.getScopeInfo();
                if(!Array.isArray(scopeInfo.options) || scopeInfo.options.length === 0) {
                    return;
                }

                let result = await httpPost("/dataset/glare/options/save", scopeInfo.options);
                if(result.code === 0) {
                    alert("保存成功");
                } else {
                    alert("保存失败");
                }
            }
        },
        {
            text: "导出",
            action: ctx => {

            }
        },
    ]
});

godInfo.registerModule({
    menuText: "选项执行器",
    actions: [
        {
            text: "加载参数",
            action: async ctx => {
                try {
                    let result = await httpPost("/dataset/glare/options/load");
                    if(result.code === 0) {
                        let scopeInfo = ctx.getScopeInfo();
                        scopeInfo.options = [];
                        if(Array.isArray(result.data)) {
                            scopeInfo.options = result.data;
                        }
                        ctx.tableRender(
                            [
                                { text: "#", align: "right", width: 40, formatter: (_, op) => op.rowIndex + 1 },
                                { text: "反光区域面积", column: "area" },
                                { text: "色彩饱和度", column: "meanSaturation" },
                                { text: "边缘强度", column: "edgeStrength" },
                                { text: "中心亮度衰减", column: "brightnessGradient" },
                                {
                                    text: "操作", 
                                    width: 100, 
                                    align: "center",
                                    formatter: (_, op) => {
                                        return [
                                            ctx.createLinkButton("execute", "执行", { rowIndex: op.rowIndex })
                                        ];
                                    }
                                }
                            ],
                            result.data
                        );
                    } else {
                        ctx.jsonRender(result);
                    }
                } catch(e) {
                    ctx.jsonRender(e);
                }
            }
        },
        {
            actionName: "execute",
            action: async ctx => {
                let scopeInfo = ctx.getScopeInfo();
                if(!Array.isArray(scopeInfo.options) || scopeInfo.options.length === 0) {
                    return;
                }
                let rowIndex = ctx.getElementData("rowIndex");
                let body = scopeInfo.options[rowIndex];
                if(!body) {
                    ctx.jsonRender("参数加载失败");
                    return;
                }
                try {
                    let json = await httpPost("/dataset/glare/call", body);
                    ctx.jsonRender(json);
                } catch(e) {
                    ctx.jsonRender(e);
                }
            }
        } 
    ]
});

godInfo.registerModule({
    menuText: "Loading 效果展示",
    description: "用于展示 Loading 动画效果。开启后，请切换菜单选项关闭。",
    icon: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgc3R5bGU9IndpZHRoOiAxZW07aGVpZ2h0OiAxZW07dmVydGljYWwtYWxpZ246IG1pZGRsZTtmaWxsOiBjdXJyZW50Q29sb3I7b3ZlcmZsb3c6IGhpZGRlbjsiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwLWlkPSI2Mzc3Ij48cGF0aCBkPSJNMzg0IDEyOEE2NCA2NCAxMzY4MCAxIDAgNjQwIDEyOCA2NCA2NCAxMzY4MCAxIDAgMzg0IDEyOHpNNjU1LjUzIDI0MC40N0E2NCA2NCAxMzY4MCAxIDAgOTExLjUzIDI0MC40NyA2NCA2NCAxMzY4MCAxIDAgNjU1LjUzIDI0MC40N3pNODMyIDUxMkEzMiAzMiAxMzY4MCAxIDAgOTYwIDUxMiAzMiAzMiAxMzY4MCAxIDAgODMyIDUxMnpNNzE5LjUzIDc4My41M0EzMiAzMiAxMzY4MCAxIDAgODQ3LjUzIDc4My41MyAzMiAzMiAxMzY4MCAxIDAgNzE5LjUzIDc4My41M3pNNDQ4LjAwMiA4OTZBMzIgMzIgMTM2ODAgMSAwIDU3Ni4wMDIgODk2IDMyIDMyIDEzNjgwIDEgMCA0NDguMDAyIDg5NnpNMTc2LjQ3MiA3ODMuNTNBMzIgMzIgMTM2ODAgMSAwIDMwNC40NzIgNzgzLjUzIDMyIDMyIDEzNjgwIDEgMCAxNzYuNDcyIDc4My41M3pNMTQ0LjQ3MiAyNDAuNDdBNDggNDggMTM2ODAgMSAwIDMzNi40NzIgMjQwLjQ3IDQ4IDQ4IDEzNjgwIDEgMCAxNDQuNDcyIDI0MC40N3pNNTYgNTEyQTM2IDM2IDEzNjgwIDEgMCAyMDAgNTEyIDM2IDM2IDEzNjgwIDEgMCA1NiA1MTJ6IiBmaWxsPSIjMDAwMDAwIiBwLWlkPSI2Mzc4Ij48L3BhdGg+PC9zdmc+",
    properties: [
        { id: "gid", type: "string", label: "集团号", value: "" }
    ],
    actions: [
        {
            text: "开启",
            action: ctx => {
                godInfo.loading = true;
            }
        }
    ]
});

godInfo.registerModule({
    menuText: "关于",
    icon: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgc3R5bGU9IndpZHRoOiAxZW07aGVpZ2h0OiAxZW07dmVydGljYWwtYWxpZ246IG1pZGRsZTtmaWxsOiBjdXJyZW50Q29sb3I7b3ZlcmZsb3c6IGhpZGRlbjsiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwLWlkPSI1NzM5Ij48cGF0aCBkPSJNNTIxLjIxNiA4Ny41MDU0NTVjLTU1Ljg1NDU0NSAwLTEwMi40IDQ2LjU0NTQ1NS0xMDIuNCAxMDIuNHM0Ni41NDU0NTUgMTAyLjQgMTAyLjQgMTAyLjQgMTAyLjQtNDYuNTQ1NDU1IDEwMi40LTEwMi40LTQ2LjU0NTQ1NS0xMDIuNC0xMDIuNC0xMDIuNHpNMjc5LjI3MjcyNyAzNzIuMzYzNjM2bC0wLjA5MzA5MSA2OC44ODcyNzNTNDE4LjkwOTA5MSA0MzEuMzgzMjczIDQxOC45MDkwOTEgNTU4LjU0NTQ1NXYxMzkuNjM2MzYzYzAgMTM5LjYzNjM2NC0xMzkuNzI5NDU1IDE2MS45NzgxODItMTM5LjcyOTQ1NSAxNjEuOTc4MTgyTDI3OS4yNzI3MjcgOTMwLjkwOTA5MWg0ODQuMDcyNzI4bC0wLjA5MzA5MS03MC43NDkwOTFzLTExMS43MDkwOTEgMC0xMTEuNzA5MDkxLTEzOS42MzYzNjRMNjUxLjYzNjM2NCA0NjUuNDU0NTQ1czAtOTMuMDkwOTA5LTkzLjA5MDkwOS05My4wOTA5MDlIMjc5LjI3MjcyN3oiIGZpbGw9IiMwMTAxMDEiIHAtaWQ9IjU3NDAiPjwvcGF0aD48L3N2Zz4=",
    onOpened: ctx=> {
        ctx.jsonRender({
            "版本信息": {
                "版本号": godInfo.version
            }
        });
    }
});



    //#region Http Request

    function getContentDisposition(header) {
    let content = header.get("Content-Disposition");
    content = content ? content : "";
    let parts = content ? content.split(";") : [];
    let result = {
        value: ""
    };
    for(let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if(part) {
            part = part.trim();
        }
        if(part.indexOf("=") > -1) {
            let arr = part.split("=");
            result[arr[0].trim()] = ecodeURIComponent(arr[1].trim());
        } else {
            result.value = part;
        }
    }
    return result;
}

async function httpUpload(url, data) {
    return await httpPost(url, data, {
        requestDataType: "file"
    });
}

async function httpDownload(url, data, filename, method) {
    let resp;
    const options = {
        responseDataType: "file"
    };

    if(arguments.length < 4 && typeof data === "string") {
        let upCase = data.toUpperCase();
        if(upCase === "GET" || upCase === "POST") {
            method = upCase;
        } else {
            method = filename;
            filename = data;
        }
        data = null;
    }

    if(method === "GET") {
        resp = await httpGet(url, data, options);
    } else {
        resp = await httpPost(url, data, options);
    }
    if(resp.ok) {
        if(isEmpty(filename)) {
            filename = getContentDisposition(resp.headers)?.filename;
        }
        let b = await resp.blob();
        if(b.type === "application/json") {
            let text = await b.text();
            try {
                let json = JSON.parse(text);
                throw json;
            } catch(e) {
                throw e;
            }
        }

        saveAs(blob, filename);
    } else {
        throw {
            code: "Http 请求出错了",
            status: resp.status,
            statusText: resp.statusText,
            message: resp.text()
        }
    }
}

async function parallelRequest(requestTasks, option) {
    if(!Array.isArray(requestTasks) || requestTasks.length === 0) {
        return [];
    }

    if(!option) {
        option = {};
    }

    option.size = parseInt(option.size);
    if(isNaN(option.size) || option.size < 1) {
        option.size = 3;
    }
    if(isEmpty(option.method)) {
        option.method = "GET";
    }

    const taskCount = requestTasks.length;
    let result = new Array(taskCount);
    async function execTask() {
        while(requestTasks.length > 0) {
            let task = requestTasks.shift();
            let resultIndex = taskCount - requestTasks.length - 1;

            let method = task.method || option.method;
            let responseDataType = task.responseDataType || option.requestDataType;
            let requestOptions = task.options || {};
            requestOptions.responseDataType = responseDataType;

            try {
                if(isEmpty(task.url)) {
                    throw new TypeError("url is empty.");
                }
                let resp = await httpRequest(task.url, method, task.data, requestOptions);
                result[resultIndex] = {
                    status: "success"
                };
                if(responseDataType === "blob") {
                    result[resultIndex].data = await resp.blob();
                    result[resultIndex].filename = getContentDispositionFileName(resp.headers);
                } else {
                    result[resultIndex].data = resp;
                }
            } catch(e) {
                result[resultIndex] = {
                    status: "failed",
                    message: e.message
                };
            }
        }
    }

    godInfo.loading = true;

    try {
        let executors = [];
        for(let i = 0; i < option.size; i++) {
            executors.push(execTask());
        }

        await Promise.all(executors);
    } catch(e) {
        console.error(e);
        godInfo.loading = false;
    }
    return result;
}

async function httpGet(url, data, options) {
    return await httpRequest(url, "GET", data, options);
}

async function httpPost(url, data, options) {
    return await httpRequest(url, "POST", data, options);
}

/**
 * 数据请求
 * 默认是 application/json 格式，如果需要form，data 请使用 FormData
 * @param {*} url 
 * @param {*} method GET / POST
 * @param {*} data ArrayBuffer / ArrayBufferView(Unit8Array等) / Blob / string / URLSearchParams / FormData
 * @param {*} options 请求配置
 * @returns 
 */
async function httpRequest(url, method, data, options) {
    if(!data) {
        data = {};
    }
    if(!options) {
        options = {};
    }

    method = method || "POST";
    const hasRequestBody = !(/^(?:GET|HEAD)$/.test(method));

    let requestDataType = options.requestDataType || "json";
    let responseDataType = options.responseDataType || "json";
    delete options.requestDataType;
    delete options.responseDataType;

    if(data instanceof ArrayBuffer || data instanceof Blob) {
        requestDataType = "file";
    }
    if(data instanceof FormData) {
        requestDataType = "form";
        if(data.files && data.files.length > 0) {
            requestDataType = "file";
        }
    }

    function initHeader() {
        const defaultHeaders = {};
        if(hasRequestBody && requestDataType === "json") {
            defaultHeaders["Content-Type"] = "application/json";
        }
        if(isFunction(godInfo.http.setDefaultHeaders)) {
            godInfo.http.setDefaultHeaders(defaultHeaders);
        }
        return defaultHeaders;
    }

    function initBody() {
        if(hasRequestBody) {
            if(data instanceof URLSearchParams) {
                return undefined;
            }
            if(data instanceof ArrayBuffer || data instanceof Blob || data instanceof FormData) {
                return data;
            } else if(typeof data === "string") {
                return data;
            } else {
                return JSON.stringify(data);
            }
        }
    }

    let fetchInit = Object.assign({
        method: method,
        headers: initHeader()
    }, options);
    if(godInfo.http.carryCookie) {
        fetchInit.credentials = "include";
    }
    fetchInit.body = initBody();

    let urlParams = data;
    if(!hasRequestBody) {
        let timestamp = (new Date()).getTime();
        if(data instanceof URLSearchParams) {
            urlParams.append("_t", timestamp);
        } else {
            data["_t"] = timestamp;
            urlParams = new URLSearchParams(data);
        }
    }
    if(urlParams instanceof URLSearchParams) {
        let queryString = urlParams.toString();
        let appendChar = /\?/.test(url) ? "&" : "?";
        url += appendChar + queryString;
    }

    let response = null;
    try {
        godInfo.loading = true;
        response = await fetch(url, fetchInit);
    } catch(e) {
        throw e;
    } finally {
        godInfo.loading = false;
    }

    if(responseDataType === "file") {
        return response;
    }

    if(response.ok) {
        if(responseDataType === "json") {
            return await response.json();
        } else if(requestDataType === "text") {
            return await response.text();
        } else {
            return response;
        }
    } else {
        return {
            code: "Http 请求出错了",
            status: response.status,
            statusText: response.statusText,
            message: await response.text()
        }
    }
}

    //#endregion

    //#region UI

    function initModules(godMenuPanel, godDetailPanel, modules) {
        function isEmptyModule(module) {
            return (!Array.isArray(module.properties) || module.properties.length === 0)
                && (!Array.isArray(module.actions) || module.actions.length === 0)
                && !isFunction(module.onOpened);
        }
        
        function getCurrentModule(id) {
            if(!id) {
                id = godInfo.currentMenuId;
            }
            let arr = id.split(":");
            let index = parseInt(arr[0], 10);
            let subIndex = parseInt(arr[1], 10);

            let module = modules[index];
            if(!Number.isNaN(subIndex)) {
                module = module.subModules[subIndex];
            }
            return module;
        }

        //#region Scope API

        function getPropertyId(scope, id) {
            return `${scope}::${id}`;
        }

        function parsePropertyName(name) {
            if(name === undefined || name === null) {
                return;
            }

            let result = {
                scope: undefined,
                id: undefined
            };
            let arr = name.split("::");
            if(arr.length > 1) {
                result.scope = parseInt(arr[0], 10);
                result.id = arr[1];
            } else {
                result.id = arr[0];
            }

            return result;
        }

        function getScopeInfo(scope) {
            let scopeIndex = parseInt(scope);
            if(scopeIndex < 0) {
                scopeIndex = 0;
            }
            return godInfo.currentModule.bodyScopeStack[scopeIndex];
        }

        function addScopeInfo(scopeInfo) {
            let bodyScopeStack = godInfo.currentModule.bodyScopeStack;
            if(!scopeInfo) {
                scopeInfo = {};
            }
            bodyScopeStack.push(scopeInfo);
            scopeInfo.scope = bodyScopeStack.length - 1;
            scopeInfo.enabled = true;
            return scopeInfo.scope;
        }

        function getLastScope() {
            let bodyScopeStack = godInfo.currentModule.bodyScopeStack;
            return bodyScopeStack[bodyScopeStack.length - 1];
        }

        function popLastScope() {
            let bodyScopeStack = godInfo.currentModule.bodyScopeStack;
            let scopeInfo = bodyScopeStack.pop();
            scopeInfo.enabled = false;
            return scopeInfo;
        }

        function setScopeData(scope, key, value) {
            let scopeInfo = getScopeInfo(scope);
            if(!scopeInfo) {
                console.error(`「setScopeData」- the scope: ${scope} can not find.`);
                return false;
            }
            if(!scopeInfo.data) {
                scopeInfo.data = {};
            }

            scopeInfo.data[key] = value;
        }

        function getScopeData(scope, key) {
            let scopeInfo = getScopeInfo(scope);
            if(!scopeInfo) {
                console.error(`「setScopeData」- the scope: ${scope} can not find.`);
                return null;
            }

            return scopeInfo.data ? scopeInfo.data[key] : null;
        }

        function removeScopeData(scope, key) {
            let scopeInfo = getScopeInfo(scope);
            if(scopeInfo && scopeInfo.data) {
                delete scopeInfo.data[key];
            }
        }

        function setEditorProperties(scope, editorProperties) {
            let scopeInfo = getScopeInfo(scope);
            scopeInfo.editorProperties = editorProperties;
        }

        function getEditorProperties(scope) {
            let scopeInfo = getScopeInfo(scope);
            return scopeInfo.editorProperties;
        }

        function formatEditorProperty(propertyInfo) {
            propertyInfo.scope = "editor";
            propertyInfo.originalId = propertyInfo.id;
            propertyInfo.id = `editor_${propertyInfo.originalId}`;
        }

        function isEditorProperty(property) {
            return typeof property === "string" ? property.startsWith("editor_") : property.scope === "editor";
        }

        function showDetailPanel(detailOption, contentFn) {
            return new Promise((resolve, reject) => {
                let bodyGroup = godInfo.currentModule?.bodyGroup;
                let bodyScopeStack = godInfo.currentModule.bodyScopeStack;
                if(!bodyGroup || !bodyScopeStack) {
                    try {
                        reject(new Error("no bodyGourp or bodyScopeStack"));
                    } catch(e) {
                        console.error(e);
                    }
                    return;
                }
    
                if(isFunction(detailOption)) {
                    contentFn = detailOption;
                    detailOption = null;
                }
                if(!detailOption) {
                    detailOption = {};
                }
                detailOption.depMap = new Map();
                detailOption.classes = ["move-out"];
                detailOption.styles = ["display:none"];
                if(!Array.isArray(detailOption.properties)) {
                    detailOption.properties = [];
                }
                if(!Array.isArray(detailOption.actions)) {
                    detailOption.button = [];
                }

                let scope = addScopeInfo(detailOption);
                let html = detailBodyRender(detailOption);
                appendHtml(bodyGroup, html);
                let bodyPanelList = bodyGroup.querySelectorAll(".body-panel");
                if(bodyPanelList && bodyPanelList.length === bodyScopeStack.length) {
                    let currentBody = getScopeInfo(scope - 1).bodyPanel;
                    let nextBody = bodyPanelList[bodyPanelList.length - 1];
                    detailOption.bodyPanel = nextBody;
                    
                    // 显示
                    nextBody.style.display = "flex";
                    // 更新依赖
                    updateDependency(scope);

                    // 动画事件
                    let transitionstartFn = e => {
                        nextBody.removeEventListener("transitionstart", transitionstartFn);
                        if(isFunction(contentFn)) {
                            contentFn();
                        }
                    };
                    let transitionendFn = e => {
                        nextBody.removeEventListener("transitionend", transitionendFn);
                        resolve(createActionContext({
                            element: null,
                            callAction: createCallAction(detailOption),
                            module: detailOption,
                            actionInfo: null
                        }, scope));
                    };
                    nextBody.addEventListener("transitionstart", transitionstartFn, false);
                    nextBody.addEventListener("transitionend", transitionendFn, false);

                    let currentTransitionstartFn = e => {
                        currentBody.removeEventListener("transitionstart", currentTransitionstartFn);
                    };
                    currentBody.addEventListener("transitionstart", currentTransitionstartFn);
    
                    // 开始动画
                    requestAnimationFrame(() => {
                        currentBody.classList.add("move-hide");
                        nextBody.classList.remove("move-out");
                    });
    
                    // 显示后退按钮
                    let backAction = godInfo.currentModule?.backAction;
                    if(!backAction?.classList.contains("back-action-show")) {
                        backAction?.classList.add("back-action-show");
                    }
                }
            });
        }

        function hideDetailPanel() {
            return new Promise((resolve, reject) => {
                let bodyScopeStack = godInfo.currentModule.bodyScopeStack;
                if(!bodyScopeStack || bodyScopeStack.length <= 1) {
                    try {
                        reject(new Error("cannot back"));
                    } catch(e) {
                        console.error(e);
                    }
                    return;
                }

                let scopeInfo = popLastScope();
                let nextBody = scopeInfo.bodyPanel;
                let currentBody = getLastScope().bodyPanel;
                // 设置动画事件
                let nextTransitionendFn = event => {
                    nextBody.removeEventListener("transitionend", nextTransitionendFn);
                    nextBody.remove();
                    resolve(scopeInfo);
                };
                nextBody.addEventListener("transitionend", nextTransitionendFn, false);
                currentBody.style.display = "flex";
                requestAnimationFrame(() => {
                    currentBody.classList.remove("move-hide");
                    nextBody.classList.add("move-out");
                });

                // 隐藏后退按钮
                if(bodyScopeStack.length <= 1) {
                    let backAction = godInfo.currentModule?.backAction;
                    backAction?.classList.remove("back-action-show");
                }
            });
        }

        //#endregion

        //#region Data API

        function getEditorViewModel() {
            let editorProperties = getEditorProperties(this.scope);
            return getCurrentViewModel.call(this, editorProperties || []);
        }

        function checkEditorViewModel() {
            let editorProperties = setEditorProperties(this.scope);
            let args = Array.prototype.slice.call(arguments, 0, arguments.length);
            args.splice(0, 0, editorProperties);
            return checkCurrentViewModel.apply(this, args);
        }

        function getCurrentViewModel(properties) {
            if(!properties) {
                let scopeInfo = getScopeInfo(this.scope);
                properties = scopeInfo.properties;
            }
            let model = {};
            if(Array.isArray(properties)) {
                properties.forEach((p, i) => {
                    if(p.type !== "---") {
                        model[isEditorProperty(p) ? p.originalId : p.id] = p.value;
                    }
                });
            }
            return model;
        }

        function getProperty(propertyName, properties) {
            if(!properties) {
                let scopeInfo = getScopeInfo(this.scope);
                properties = scopeInfo.properties;
            }
            if(Array.isArray(properties)) {
                for(let i = 0; i < properties.length; i++) {
                    let property = properties[i];
                    if(property.id === propertyName) {
                        return property;
                    }
                }
            }
            return null;
        }

        function setProperty(propertyName, propertyValue, properties) {
            if(!properties) {
                let scopeInfo = getScopeInfo(this.scope);
                properties = scopeInfo.properties;
            }
            if(Array.isArray(properties)) {
                for(let i = 0; i < properties.length; i++) {
                    let property = properties[i];
                    if(property.id === propertyName) {
                        property.value = propertyValue;
                        if(isFunction(property.updatePropertyElement)) {
                            property.updatePropertyElement(propertyValue);
                        }
                        return;
                    }
                }
            }
        }

        function checkCurrentViewModel(properties) {
            let scope = this.scope;
            let checkPropertyList = [];
            if(typeof properties === "string") {
                checkPropertyList = Array.prototype.slice.call(arguments, 0, arguments.length);
                properties = null;
            } else {
                checkPropertyList = Array.prototype.slice.call(arguments, 1, arguments.length);
            }
            if(!properties) {
                let scopeInfo = getScopeInfo(scope);
                properties = scopeInfo.properties;
            }
            let result = {
                valid: true,
                messages: []
            };
            if(Array.isArray(properties)) {
                if(checkPropertyList.length > 0) {
                    properties = properties.filter(p => checkPropertyList.includes(p.id));
                }
                properties.forEach((e, i) => {
                    if(e.type === "---") {
                        return;
                    }

                    if(p.required ) {
                        if(p.type === "file") {
                            let fileInput = document.getElementById(p.id);
                            if(fileInput && fileInput.files.length === 0) {
                                fileInput.value = "";
                                result.messages.push(`${p.label || p.id}未选择文件`);
                            }
                        } else if(p.type === "checkbox") {
                            if(!Array.isArray(p.value) || p.value.length === 0) {
                                result.messages.push(`${p.label || p.id}未选择`);
                            }
                        } else {
                            if(isEmpty(p.value) || Number.isNaN(p.value)) {
                                result.messages.push(`${p.label || p.id}不能为空`);
                            }
                        }
                    }
                    
                    if(isFunction(e.validate) && !e.validate(e.value)) {
                        result.messages.push(`${e.label || e.id}的值不符合要求`);
                    }
                });
            }
            if(result.messages.length > 0) {
                result.valid = false;
            }
            result.invalid = fn => {
                if(!result.valid) {
                    if(isFunction(fn)) {
                        fn(result);
                    }
                }
                return !result.valid;
            };
            return result;
        }
        
        function resetViewModel(id) {
            if(!id) {
                return;
            }
            let module = getCurrentModule(id);
            if(Array.isArray(module.properties)) {
                module.properties.forEach((e, i) => {
                    if(e.type === "---") {
                        return;
                    }
                    e.value = "";
                    delete e.updatePropertyElement;
                });
            }
        }

        //#endregion

        //#region Render API

        function renderView(html) {
            let scope = godInfo.currentModule.__scope;
            let scopeInfo = getScopeInfo(scope || 0);
            if(scopeInfo && scopeInfo.enabled) {
                let bodyPanel = scopeInfo.bodyPanel;
                let resultPanel = bodyPanel.querySelector(".result-panel");
                if(!resultPanel) {
                    return;
                }
                replaceHtml(resultPanel, html);
            }
        }

        function createLinkButton(actionName, text, param) {
            let scope = this.scope || 0;
            let attrs = [`data-scope="${scope}"`];
            if(!isEmpty(param)) {
                Object.keys(param).forEach(key => {
                    let attrName = convertDataAttr(key);
                    let attrValue = param[key];
                    attrs.push(`${attrName}="${attrValue}"`);
                });
            }
            let dataAttrs = attrs.join(" ");
            return `<a data-action-name="${actionName}" ${dataAttrs}>${text}</a>`;
        }

        // Json 结果集展示
function jsonRender(data, formatter) {
    if(data instanceof Error) {
        data = data.message;
    }

    function createItem(name, value, customHtml) {
        let hasName = !isEmpty(name);
        let arr = customHtml;
        if(!Array.isArray(arr)) {
            arr = [];
        }
        if(!isEmpty(value)) {
            arr.splice(0, 0, value);
        }
        let htmlArr = [];
        let colorClass = "";
        arr.forEach((e, i) => {
            colorClass = i === 0 ? "primary-color" : "";
            if(!hasName && i === 0) {
                htmlArr.push(`<span class="primary-color">${e}</span>`);
            } else {
                htmlArr.push(`<span class="before ${colorClass}">${e}</span>`);
            }
        });
        customHtml = htmlArr.join("");
        return `
            <div class="result-item">
                ${htmlCondition(!isEmpty(name), name, html`<label>${0}</label>`)}
                ${customHtml}
            </div>
        `;
    }   

    function createArrayitem(elem, index, formatterFn) {
        let customHtml = "";
        if(isFunction(formatterFn)) {
            customHtml = formatterFn(elem);
        }
        let ab = [];
        if(index === 0) {
            ab.push('<div class="result-item-group">');
        }
        ab.push(createItem((index + 1), (typeof elem === "string" ? elem : elem.name), customHtml));
        if(index === elem.len - 1) {
            ab.push('</div>');
        }
        return ab.join("");
    }

    function createMarks(level) {
        let h = [];
        for(let i = 0; i < level; i++) {
            h.push('<b class="result-title-marker"></b>');
        }
        return h.join("");
    }

    let htmlBuilder = [];
    let stack = [];
    stack.push({ name: null, value: data, level: 0, begin: 1, end: 1 });
    while(stack.length > 0) {
        let item = stack.pop();
        if(item.level > 0 && item.name) {
            htmlBuilder.push(`
                <div class="result-title">
                    ${createMarks(item.level)}<span>${item.name}</span>
                </div>
            `);
        }

        if(item.begin) {
            htmlBuilder.push('<div class="result-content">');
        }

        if(item.arrayElem) {
            htmlBuilder.push(createArrayitem(item.value, item.index, item.formatter));
        } else if(typeof item.value === "object" && item.value) {
            if(Array.isArray(item.value)) {
                let temp = [];
                let formatterFn = formatter ? formatter[item.name] : undefined;
                let len = item.value.length;
                for(let i = 0; i < len; i++) {
                    let elem = item.value[i];
                    if(elem) {
                        temp.push({
                            arrayElem: 1,
                            formatter: formatterFn,
                            index: i,
                            len: len,
                            value: elem,
                            level: item.level + 1,
                            begin: 0,
                            end: 0
                        });
                    }
                }
                if(temp.length > 0) {
                    temp[temp.length - 1].end += item.end;
                    item.end = 0;
                    temp.reverse().forEach(e => stack.push(e));
                }
            } else {
                let keys = Object.keys(item.value);
                let temp = [];
                let valProps = [];
                for(let i = 0; i < keys.length; i++) {
                    let subItem = item.value[keys[i]];
                    let type = typeof subItem;
                    if(type === "object" && subItem) {
                        temp.push({
                            name: keys[i],
                            value: (Array.isArray(subItem) && subItem.length === 0) ? "[]" : subItem,
                            level: item.level + 1,
                            begin: 1,
                            end: 1
                        });
                    } else {
                        valProps.push(createItem(keys[i], subItem + ""));
                    }
                }
                if(valProps.length > 0) {
                    htmlBuilder.push('<div class="result-item-group">');
                    valProps.forEach(e => htmlBuilder.push(e));
                    htmlBuilder.push("</div>");
                }
                if(temp.length > 0) {
                    temp[temp.length - 1].end += item.end;
                    item.end = 0;
                    temp.reverse().forEach(i => stack.push(i));
                }
            }
        } else {
            htmlBuilder.push('<div class="result-item-group">');
            htmlBuilder.push(createItem("", item.value + ""));
            htmlBuilder.push("</div>");              
        }

        for(let i = 0; i < item.end; i++) {
            htmlBuilder.push('</div>');
        }
    }

    renderView(htmlBuilder.join(""));
};


function editorRender(properties, layout, scope) {
    if(!Array.isArray(properties) || properties.length === 0) {
        return;
    }

    if(typeof layout === "number") {
        scope = layout;
        layout = null;
    }

    if(!godInfo.currentModule) {
        throw new TypeError("状态错误，缺少 godInfo.currentModule");
    }

    if(typeof scope !== "number") {
        scope = this.scope;
    }
    setEditorProperties(scope, properties);
    const depMap = godInfo.currentModule.depMap;

    function repeat(count, fn) {
        let b = [];
        for(let i = 0; i < count; i++) {
            b.push(fn(i));
        }
        return b.join(" ");
    }

    if(!layout) {
        layout = {};
    }

    if(!layout.columnWidth) {
        layout.columnWidth = "1fr";
    }
    let gridTemplateColumns = `grid-template-columns:${isNaN(Number.parseInt(layout.columns)) ? repeat(2, () => layout.columnWidth) : repeat(layout.columns, () => layout.columnWidth)};`;
    if(!layout.height) {
        layout.height = "auto";
    }
    let contentStyle = "";
    let formContainerStyle = "";
    if(layout.height === "full") {
        contentStyle = "height:calc(100% - 20px);overflow:auto";
        formContainerStyle = "margin:20px;height:calc(100% - 40px)";
    }
    if(layout.width) {
        if(formContainerStyle) {
            formContainerStyle += ";";
        }
        formContainerStyle += `width:${layout.width}`;
    }

    let htmlBuilder = [];
    htmlBuilder.push(`<ul class="form-list" style="${gridTemplateColumns}${formContainerStyle}">`);
    properties.forEach(p => {
        formatEditorProperty(p);
        if(isEmpty(p.type)) {
            return;
        }

        htmlBuilder.push("<li>");
        htmlBuilder.push(componentRender(p, depMap, scope));
        htmlBuilder.push("</li>");
    });
    htmlBuilder.push("</ul>");

    renderView(`
        <div class="result-content-panel result-content-border" style="${contentStyle}">
        ${htmlBuilder.join("")}
        </div>
    `);

    // 更新依赖
    updateDependency(scope, properties);
};

// 控件绘制
function componentRender(propertyInfo, depMap, scope) {
    function insertStar(hasStar) {
        return hasStar ? `<span class="required-star">*</span>` : "";
    }

    function selectRender(options, propertyInfo) {
        let selectValue = propertyInfo.value;
        propertyInfo.value = "";
        let htmlBuilder = [`<option value="">请选择</option>`];
        if(Array.isArray(options)) {
            let optionGroup = {};
            options.forEach(p => {
                if(selectValue) {
                    if(p.value === selectValue) {
                        p.selected = true;
                    } else {
                        p.selected = false;
                    }
                }
                let group = p.group || "NONE";
                let groupItem = optionGroup[group];
                if(!groupItem) {
                    groupItem = {
                        label: group,
                        options: []
                    };
                    optionGroup[group] = groupItem;
                }
                groupItem.options.push(p);
            });
            Object.keys(optionGroup).forEach(key => {
                let groupItem = optionGroup[key];
                const isGroup = key !== "NONE";
                if(isGroup) {
                    htmlBuilder.push(`<optgroup label="${key}">`);
                }
                groupItem.options.forEach(option => {
                    if(typeof option !== "object") {
                        option = { value: option }
                    }
                    let value = option.value;
                    let text = option.text || value;
                    let selected = !!option.selected;
                    htmlBuilder.push(`<option value="${value}" ${selected ? "selected" : ""}>${text}</option>`);
                    if(selected) {
                        propertyInfo.value = value;
                    }
                });
                if(isGroup) {
                    htmlBuilder.push(`</optgroup>`);
                }
            });
        }
        return htmlBuilder.join("");
    }

    function checkboxRender(options, propertyInfo, propertyId) {
        let htmlBuilder = [];
        if(Array.isArray(options)) {
            const selectedValues = [];
            options.forEach((option, idx) => {
                let value = option.value;
                let text = option.text || value;
                let selected = !!option.selected;
                htmlBuilder.push(`<input id="${propertyId}_${idx}" data-property-name="${propertyId}" type="checkbox" value="${value}" ${selected ? "checked" : ""}>`);
                htmlBuilder.push(`<label for="${propertyId}_${idx}" class="checkbox-text">${text}</label>`);
                if(selected) {
                    selectedValues.push(value);
                }
            });
            propertyInfo.value = selectedValues;
        }
        return htmlBuilder.join("");
    }

    if(isEmpty(propertyInfo.type)) {
        return "";
    } else if(propertyInfo.type === "---") {
        return `<hr class="line">`;
    }

    propertyInfo.updatePropertyElement = null;
    let htmlBuilder = [];
    const propertyId = getPropertyId(scope, propertyInfo.id);
    let value = isEmpty(propertyInfo.value) ? "" : propertyInfo.value;
    htmlBuilder.push(`<label class="label-text primary-color">${propertyInfo.label || propertyId}</label>${insertStar(propertyInfo.required)}<br>`);
    switch(propertyInfo.type) {
        case "string":
            htmlBuilder.push(`<input id="${propertyId}" type="text" data-property-name="${propertyId}" value="${value}">`);
            break;
        case "text":
            htmlBuilder.push(`<textarea id="${propertyId}" data-property-name="${propertyId}">${value}</textarea>`);
            break;
        case "select":
            let options = propertyInfo.options;
            if(propertyInfo.optionsDep) {
                Object.keys(propertyInfo.optionsDep).forEach(k => {
                    depMap.set(getPropertyId(scope, k), {
                        depFn: propertyInfo.optionsDep[k],
                        destinationProperyInfo: propertyInfo,
                        selectRender
                    });
                });
                options = [];
            }
            htmlBuilder.push(`<select id="${propertyId}" data-property-name="${propertyId}">`);
            htmlBuilder.push(selectRender(options, propertyInfo));
            htmlBuilder.push(`</select>`);
            break;
        case "checkbox":
            htmlBuilder.push(`<div id="${propertyId}" class="checkbox-panel">`);
            htmlBuilder.push(checkboxRender(propertyInfo.options, propertyInfo, propertyId));
            htmlBuilder.push("</div>");
            propertyInfo.updatePropertyElement = value => {
                if(isEmpty(value)) {
                    value = [];
                }
                value = isArray(value) ? value : [value];
                let div = document.getElementById(propertyId);
                if(div) {
                    let elements = div.querySelectorAll("input[type=checkbox]");
                    if(elements) {
                        elements.forEach(elem => elem.checked = value.includes(elem.value));
                    }
                }
            };
            break;
        case "file":
            htmlBuilder.splice(htmlBuilder.length - 1, 1, `
                <label class="label-file">
                    <input id="${propertyId}" type="file" data-property-name="${propertyId}" value="">
                    <span>${propertyInfo.label}</span>
                </label>
            `);
            propertyInfo.updatePropertyElement = value => {};
            break;
        case "hidden":
            htmlBuilder.splice(htmlBuilder.length - 1, 1, `<input id="${propertyId}" type="${propertyInfo.type}" value="${value}"`);
            break;
        case "color":
            if(isEmpty(value)) {
                value = theme.primaryColor;
                propertyInfo.value = value;
            }
            htmlBuilder.push(`<input id="${propertyId}" type="color" value="${value}"`);
            break;
        default:
            htmlBuilder.push(`<input id="${propertyId}" type="${propertyInfo.type}" data-property-name="${propertyId}" value="${value}"`);
            ["min", "max", "step"].forEach(attr => {
                if(!isEmpty(propertyInfo[attr])) {
                    htmlBuilder.push(` ${attr}="${propertyInfo[attr]}"`);
                }
            });
            htmlBuilder.push(" />");
            break;
    }
    if(!propertyInfo.updatePropertyElement) {
        propertyInfo.updatePropertyElement = value => {
            let element = document.getElementById(propertyId);
            if(element) {
                element.value = value;
            }
        };
    }
    return htmlBuilder.join("");
};

// 表格展示
function tableRender(columns, data, option) {
    if(arguments.length < 3 && !Array.isArray(data)) {
        option = data;
        data = columns;
        columns = null;
    }

    if(!option) {
        option = {
            // auto | fixed
            layout: "auto"
        };
    }

    let renderFn = isFunction(option.renderFn) ? option.renderFn : renderView;

    if(!Array.isArray(data)) {
        data = [];
    }

    if(!columns) {
        columns = [];
        let firstRow = data[0];
        if(typeof firstRow === "object" && !isEmpty(firstRow)) {
            Object.keys(firstRow).forEach(k => columns.push({ column: k }));
        }
    }

    function formatValue(column, row, val, rowIndex, colIndex) {
        return isFunction(column.formatter) 
                ? column.formatter(val, { row: row, column: column, rowIndex: rowIndex, colIndex: colIndex}) 
                : val;
    }

    function formatColumn(column, val, colIndex) {
        return isFunction(val) ? val(column, colIndex) : val;
    }

    function getValue(row, column) {
        if(!column || !row) {
            return "";
        }
        let arr = column.split(".");
        let value = row;
        for(let i = 0; i < arr.length; i++) {
            let col = arr[i].trim();
            if(!col) {
                continue;
            }
            value = value[col];
        }
        return value;
    }

    function colgroup(columns) {
        const htmlBuilder = [];
        if(Array.isArray(columns) && columns.length > 0) {
            htmlBuilder.push("<colgroup>");
            columns.forEach(col => {
                htmlBuilder.push(`<col ${htmlCondition(v => typeof(v.width) === "number", col, html`style="width:${'width'}px"`)}>`);
            });
            htmlBuilder.push("</colgroup>");
        }
        return htmlBuilder.join("");
    }

    function thead(columns) {
        const htmlBuilder = [];
        if(Array.isArray(columns) && columns.length > 0) {
            htmlBuilder.push("<thead>");
            htmlBuilder.push("<tr>");
            columns.forEach((col, i) => {
                htmlBuilder.push(`
                    <th class="table-view-th" ${htmlCondition(col.align, col, html`style="text-align:${'align'}"`)}>
                        ${formatColumn(col, (col.text || col.column), i)}
                    </th>
                `);
            });
            htmlBuilder.push("</tr>");
            htmlBuilder.push("</thead>");
        }
        return htmlBuilder.join("");
    }

    function tbody(columns, data) {
        const htmlBuilder = [];
        if(Array.isArray(data) && data.length > 0) {
            htmlBuilder.push("<tbody>");
            for(let i = 0; i < data.length; i++) {
                let row = data[i];
                let isLastRow = i === data.length - 1;
                htmlBuilder.push('<tr class="table-view-row">');
                if(typeof row === "object") {
                    for(let j = 0; j < columns.length; j++) {
                        let col = columns[j];
                        htmlBuilder.push(`
                            <td class="table-view-td" ${htmlCondition(col.align, col, html`style="text-align:${'align'}"`)}>
                                ${formatValue(col, row, getValue(row, col.column), i, j)}
                            </td>
                        `);
                    }
                } else {
                    htmlBuilder.push(`<td class="table-view-td">${row}</td>`);
                }
                htmlBuilder.push("</tr>");
            }
            
            htmlBuilder.push("</tbody>");
        }
        return htmlBuilder.join("");
    }

    renderFn(`
       <div class="result-content-panel result-content-border" style="overflow:auto">
            <table class="table-view" cellspacing="0" cellpadding="0">
                ${colgroup(columns)}
                ${thead(columns)}
                ${tbody(columns, data)}
            </table>
        </div>
        ${htmlCondition(isFunction(option.renderWith), () => `<div class="result-content-panel">${option.renderWith()}</div>`)}
    `);
};

// 分页按钮绘制
function pageButtonRender(option) {
    let pageIndex = option.pageIndex || 1;
    let pageCount = option.pageCount || 0;
    let pageSize = option.pageSize || 20;
    if(option.rowCount) {
        pageCount = Math.floor((option.rowCount + pageSize - 1) / pageSize);
    }
    let buttonCount = option.buttonCount || 10;
    const _ex = Math.floor((buttonCount - 1) / 2);
    let scope = this.scope;

    function pageButtonRender(pageNum) {
        if(pageNum === pageIndex) {
            return `<span class="page-button-selected">${pageNum}</span>`;
        }
        let actionName = option.actionName || "";
        return `<a class="page-button" href="javascript:void(0)" data-action-name="${actionName}" data-scope="${scope}" data-page-index="${pageNum}" data-page-size="${pageSize}">${pageNum}</a>`;
    }

    function pageText(text) {
        return `<span class="page-text">${text}</span>`;
    }

    //添加页码按钮
    let start = pageIndex - _ex;
    start = (start < 1) ? 1 : start;
    let end = start + buttonCount - 1;
    end = (end > pageCount) ? pageCount : end;
    if ((end - start + 1) < buttonCount) {
        if ((end - (buttonCount - 1)) > 0) {
            start = end - (buttonCount - 1);
        }
        else {
            start = 1;
        }
    }

    let htmlBuilder = [];

    //当start不是从1开始时显示带有特殊标记的首页
    if (start > 1) {
        htmlBuilder.push(pageButtonRender(1));
        htmlBuilder.push(pageText("..."));
    }
    for (let i = start, btn; i <= end; i++) {
        htmlBuilder.push(pageButtonRender(i));
    }
    //当end不是最后一页时显示带有特殊标记的尾页
    if (end < pageCount) {
        htmlBuilder.push(pageText("..."));
        htmlBuilder.push(pageButtonRender(pageCount));
    }

    return `
        <div class="page-button-panel">
            ${htmlBuilder.join("")}
        </div>
    `;
};

/**
 * 图片视图
 * @param options = { type: "url" || "blob" || "arrayBuffer" || "base64" }
 * @param arguments[0-1] ~ [n] , string || Blob || ArrayBuffer || { mime: <string>, data: <string> }
 * @returns 
 */
function imageRender() {
    if(arguments.length === 0) {
        return;
    }

    let imageArgIndex = 0;
    let options = arguments[0];
    if(typeof options === "object" && !(options instanceof Blob) && !(options instanceof ArrayBuffer)) {
        if(options instanceof Blob) {
            imageArgIndex++;
            options = {
                type: "blob"
            };
        } else if(options instanceof ArrayBuffer) {
            imageArgIndex++;
            options = {
                type: "arrayBuffer"
            };
        } else {
            options.type = isEmpty(options.type) ? "url" : options.type;
        }
    } else {
        options = {
            type: "url"
        }
    }

    let argArray = Array.prototype.slice.call(arguments, imageArgIndex, arguments.length);
    let afterTasks = [];
    let htmlBuilder = [];
    for(let i = 0; i < argArray.length; i++) {
        let arg = argArray[i];
        if(isEmpty(arg)) {
            continue;
        }
        htmlBuilder.push(`<div class="result-content-panel">`);
        if(options.type === "url") {
            htmlBuilder.push(`<img class="image-view" src="${arg}">`);
        } else if(options.type === "base64") {
            let mime, data;
            if(typeof arg === "string") {
                mime = options.mime;
                data = arg;
            } else {
                mime = arg.mime || options.mime;
                data = arg.data;
            }
            htmlBuilder.push(`<img class="image-view" src="data:${mime};base64,${data}" >`);
        } else {
            let imageId = "imageview::" + generateId() + "::" + (i + 1);
            let imgBlob = arg;
            if(options.type === "arrayBuffer") {
                imgBlob = new Blob(arg);
            }
            htmlBuilder.push(`<img id=${imageId} class="image-view">`);
            afterTasks.push(() => {
                let img = document.getElementById(imageId);
                if(img) {
                    img.src = URL.createObjectURL(imgBlob);
                }
            });
        }
        htmlBuilder.push("</div>");
    }

    renderView(htmlBuilder.join(""));
    afterTasks.forEach(fn => fn());
};



        function formRender(properties, scope) {
            let htmlBuilder = [];
            htmlBuilder.push('<ul class="form-list">');
            if(Array.isArray(properties)) {
                const depMap = getScopeInfo(scope).depMap;
                properties.forEach((p, i) => {
                    htmlBuilder.push("<li>");
                    htmlBuilder.push(componentRender(p, depMap, scope));
                    htmlBuilder.push("</li>");
                });
            }
            htmlBuilder.push("</ul>");
            return htmlBuilder.join("");
        }

        function buttonRender(buttonList, scope) {
            let htmlBuilder = [];
            if(Array.isArray(buttonList) && buttonList.length > 0) {
                if(buttonList.length > 0) {
                    buttonList.forEach((b, i) => {
                        if(isEmpty(b.text)) {
                            return;
                        }
                        if(b.devMode && !godInfo.debug) {
                            return;
                        }
                        htmlBuilder.push(`<button data-button-index="${i}" ${htmlCondition(v => !isEmpty(v), scope, html`data-scope="${0}"`)}>${b.text}</button>`);
                    });
                }
            }
            if(htmlBuilder.length > 0) {
                return `
                    <section class="button-panel">
                        ${htmlBuilder.join("")}
                    </section>
                `;
            }
            return "";
        }

        function detailBodyRender(detailOption) {
            let bodyLayout = isEmpty(detailOption.layout) ? "left-right" : detailOption.layout;
            let properties = detailOption.properties;
            let actions = detailOption.actions;
            let scope = detailOption.scope;
            let bodyClass = 
                Array.isArray(detailOption.classes) && detailOption.classes.length > 0 
                    ? " " + detailOption.classes.join(" ")
                    : "";
            let bodyStyle = 
                Array.isArray(detailOption.styles) && detailOption.styles.length > 0 
                    ? ` style="${detailOption.styles.join(";")}"` 
                    : "";
            return `
                <section class="body-panel${bodyClass}"${bodyStyle}>
                    <section class="body-container ${bodyLayout}">
                        ${htmlCondition(Array.isArray(properties) && properties.length > 0, formRender(properties, scope), html`<section class="form-panel">${0}</section>`)}
                        <section class="result-panel"></section>
                    </section>
                    ${buttonRender(actions, scope)}
                </section>
            `;
        }

        //#endregion

        function createActionContext(ctx, scope) {
            function wrapReander(fn) {
                return (function() {
                    try {
                        if(godInfo.currentModule.__scope__num > 0) {
                            godInfo.currentModule.__scope__num++;
                        } else {
                            godInfo.currentModule.__scope = scope;
                            godInfo.currentModule.__scope__num = 1;
                        }
                        
                        return fn.apply(this, arguments);
                    } catch(e) {
                        console.error("call render function error.", e);
                    } finally {
                        godInfo.currentModule.__scope__num--;
                        if(godInfo.currentModule.__scope__num === 0) {
                            godInfo.currentModule.__scope = null;
                        }
                    }
                }).bind(ctx);
            }
            if(!ctx) {
                ctx = {};
            }
            let funcList = {
                scope,
                getScopeInfo: function() {
                    return getScopeInfo(ctx.scope || 0);
                },
                getCurrentViewModel: function() {
                    return getCurrentViewModel.apply(ctx, arguments);
                },
                getProperty: function() {
                    return getProperty.apply(ctx, arguments);
                },
                setProperty: function() {
                    return setProperty.apply(ctx, arguments);
                },
                checkCurrentViewModel: function() {
                    return checkCurrentViewModel.apply(ctx, arguments);
                },
                getEditorViewModel: function() {
                    return getEditorViewModel.apply(ctx, arguments);
                },
                checkEditorViewModel: function() {
                    return checkEditorViewModel.apply(ctx, arguments);
                },
                createLinkButton: function() {
                    return createLinkButton.apply(ctx, arguments);
                },
                getElementData: (function (key) {
                    return this.element ? this.element.dataset[key] : null;
                }).bind(ctx),
                setData: (function(key, value) {
                    return setScopeData(this.scope, key, value);
                }).bind(ctx),
                getData: (function(key) {
                    return getScopeData(this.scope, key);
                }).bind(ctx),
                removeData: (function(key) {
                    return removeScopeData(this.scope, key);
                }).bind(ctx),
                jsonRender: wrapReander(jsonRender),
                tableRender: wrapReander(tableRender),
                pageButtonRender: wrapReander(pageButtonRender),
                editorRender: wrapReander(editorRender),
                imageRender: wrapReander(imageRender),
                showDetailPanel: function() {
                    return showDetailPanel.apply(ctx, arguments);
                },
                hideDetailPanel: function() {
                    return hideDetailPanel.apply(ctx, arguments);
                }
            };
            return Object.assign(ctx, funcList);
        }

        function createCallAction(scopeInfo) {
            return (actionName, param, onSuccess, onError) => {
                let scope = scopeInfo.scope;
                if(!scopeInfo || !Array.isArray(scopeInfo.actions)) {
                    return;
                }
                let actionInfo = scopeInfo.actions.find(b => b.actionName === actionName);
                let options = {
                    onSuccess,
                    onError,
                    param
                };
                callAction(actionInfo, scopeInfo, null, scope, options);
            };
        }

        function callAction(actionInfo, module, elem, scope, options) {
            if(!options) {
                options = {};
            }
            if(actionInfo && isFunction(actionInfo.action)) {
                const doSuccess = result => {
                    if(isFunction(options.onSuccess)) {
                        options.onSuccess.call(null, result);
                    }
                };
                const doError = e => {
                    if(isFunction(options.onError)) {
                        options.onError.call(null, e);
                    }
                };
                try {
                    let result = actionInfo.action(createActionContext({
                        element: elem,
                        callAction: createCallAction(module),
                        module,
                        actionInfo,
                        param: options.param
                    }, scope));
                    if(result instanceof Promise) {
                        result.then(doSuccess).catch(doError);
                    } else {
                        doSuccess(result);
                    }
                } catch(e) {
                    doError(e);
                }
            }
        }

        // 打开页面
        function openPage(moduleInfo) {
            if(!moduleInfo) {
                return;
            }

            let scopeInfo = {
                layout: moduleInfo.layout,
                properties: moduleInfo.properties,
                actions: moduleInfo.actions,
                depMap: new Map()
            };
            addScopeInfo(scopeInfo);
            let backActionStyle = "";
            if(!isEmpty(moduleInfo.description)) {
                backActionStyle = "margin-top:2px";
            }

            let elem = `
                <div id="detailContentPanel" class="content-panel content-panel-actived">
                    <section class="header-panel">
                        <div class="title-panel">
                            <h1>${moduleInfo.menuText}</h1>
                            ${htmlCondition(v => !isEmpty(v), moduleInfo.description, html`<p>${0}</p>`)}
                        </div>
                    </section>
                    <section class="body-group">
                        ${detailBodyRender(scopeInfo)}
                    </section>
                </div>
                <div id="loadingElement" class="page-progress large circles">
                    <span class="circle"></span>
                    <span class="circle"></span>
                    <span class="circle"></span>
                    <span class="circle"></span>
                    <span class="circle"></span>
                    <span class="circle"></span>
                </div>
            `;
            replaceHtml(godDetailPanel, elem);

            godInfo.currentModule.bodyGroup = godDetailPanel.querySelector(".body-group");
            godInfo.currentModule.backAction = godDetailPanel.querySelector("a.back-action");
            scopeInfo.bodyPanel = godInfo.currentModule.bodyGroup.querySelector(".body-panel");

            // 更新依赖
            updateDependency(scopeInfo.scope);

            godInfo.ui.onOpened({
                module: moduleInfo,
                moduleInfo: godInfo.currentModule
            });
        }

        // 关闭页面
        function closePage(moduleInfo) {
            if(!moduleInfo) {
                return;
            }

            godInfo.loading = false;
            // 重置属性
            resetViewModel(moduleInfo.id);
            // 触发事件
            let module = getCurrentModule(moduleInfo.id);
            godInfo.ui.onClosed({ 
                module: module, 
                moduleInfo: moduleInfo 
            });
        }

        function updateDependency(scope, changedProperyInfo, properties) {
            if(Array.isArray(scope)) {
                properties = scope;
                scope = null;
            } else if(typeof scope === "object") {
                changedProperyInfo = scope;
                scope = null;
            }

            if(Array.isArray(changedProperyInfo)) {
                properties = changedProperyInfo;
                changedProperyInfo = null;
            }

            if(!changedProperyInfo) {
                if(!Array.isArray(properties)) {
                    let moduleInfo = getScopeInfo(scope);
                    properties = Array.isArray(moduleInfo.properties) ? moduleInfo.properties : [];
                }
                properties.forEach(p => {
                    updateDependency(scope, p);
                });
            } else {
                const depMap = getScopeInfo(scope).depMap;
                const id = getPropertyId(scope, changedProperyInfo.id);
                if(!depMap || !depMap.has(id)) {
                    return;
                }

                let depInfo = depMap.get(id);
                if(!isFunction(depInfo.depFn)) {
                    return;
                }
                if(depInfo.destinationProperyInfo.type === "select") {
                    let descriptionId = getPropertyId(scope, depInfo.destinationProperyInfo.id);
                    let selectElem = document.getElementById(descriptionId);
                    if(selectElem) {
                        let options = depInfo.depFn(changedProperyInfo.value, depInfo.destinationProperyInfo);
                        replaceHtml(selectElem, depInfo.selectRender(options, depInfo.destinationProperyInfo));
                    }
                }
            }
        }

        // 生成菜单
        (function() {
            godInfo.ui.onClosed(e => {
                const module = e.module;
                if(!module) {
                    return;
                }
                if(isFunction(module.onClosed)) {
                    module.onClosed(module);
                }
            });
            godInfo.ui.onOpened(e => {
                const module = e.module;
                if(!module) {
                    return;
                }
                if(isFunction(module.onOpened)) {
                    let scopeInfo = getScopeInfo(0);
                    module.onOpened(createActionContext({
                        module: scopeInfo, 
                        callAction: createCallAction(scopeInfo)
                    }, scopeInfo.scope));
                }
            });
            
            function menuItemRender(menuItem, id, level) {
                let marginLeft = 8 + 24 * level;
                menuItem.id = id;
                return `
                    <dt data-menu-id="${id}">
                        <b></b>
                        <u>
                            <i style="margin-left: ${marginLeft}px;${htmlCondition(icon => !isEmpty(icon), menuItem.icon, html`background-image:url(${0})`)}"></i><span>${menuItem.menuText}</span>
                        </u>
                        ${htmlCondition(Array.isArray(menuItem.subModules) && menuItem.subModules.length > 0, null, html`<a class="extend-button" href="javascript:void(0)"></a>`)}
                    </dt>
                `;
            }

            function switchSubMenu(extendButton) {
                let subMenuElement = extendButton.parentElement.nextElementSibling;
                if(subMenuElement.classList.contains("submenu-opend")) {
                    subMenuElement.classList.remove("submenu-opend");
                    extendButton.classList.remove("extend-button-up");
                } else {
                    subMenuElement.classList.add("submenu-opend");
                    extendButton.classList.add("extend-button-up");
                }
            }

            const htmlBuilder = [];
            htmlBuilder.push("<dl>");
            modules.forEach((m, i) => {
                if(m["coming-soon"] && !godInfo.debug) {
                    return;
                }
                htmlBuilder.push(menuItemRender(m, i, 0));
                if(m.subModules) {
                    htmlBuilder.push("<dd>", "<dl>");
                    m.subModules.forEach((sub, j) => {
                        if(sub["coming-soon"] && !godInfo.debug) {
                            return;
                        }
                        htmlBuilder.push(menuItemRender(sub, (i + ":" + j), 1));
                    });
                    htmlBuilder.push("</dl>", "</dd>");
                }
            });
            htmlBuilder.push("</dl>");
        
            appendHtml(godMenuPanel, htmlBuilder.join(""));

            const dl = godMenuPanel.getElementsByTagName("dl")[0];
            if(dl) {
                on(dl, "click", e => {
                    if(godInfo.requestStart) {
                        return;
                    }
                    let elem = e.target;
                    while(elem.tagName !== 'DT') {
                        if(elem.tagName === "DL" || elem.id === "godMenuPanel") {
                            return;
                        }
                        if(elem.classList.contains("extend-button")) {
                            switchSubMenu(elem);
                            return;
                        }
                        elem = elem.parentNode;
                    }

                    let id = elem.dataset.menuId;
                    if(godInfo.currentModule?.id === id) {
                        return;
                    }
                    let moduleInfo = getCurrentModule(id);
                    if(isEmptyModule(moduleInfo)) {
                        return;
                    }

                    let dtList = dl.getElementsByTagName("dt");
                    for(let i = 0; i < dtList.length; i++) {
                        let dt = dtList[i];
                        if(dt.classList.contains("menu-item-selected")) {
                            dt.classList.remove("menu-item-selected");
                            break;
                        }
                    }
                    closePage(godInfo.currentModule);

                    elem.classList.add("menu-item-selected");
                    godInfo.currentModule = {
                        id : id,
                        elememet: elem,
                        bodyScopeStack: []
                    };

                    openPage(moduleInfo);
                });
            }
        })();

        // 注册事件
        (function() {
            on(godDetailPanel, "click", e => {
                if(godInfo.loading) {
                    return;
                }
                let elem = e.target;
                while(elem.tagName !== 'BUTTON' && elem.tagName !== "A") {
                    if(elem.id === "godDetailPanel") {
                        return;
                    }
                    elem = elem.parentElement;
                }
    
                let scope = elem.dataset.scope || 0;
                let module = getScopeInfo(scope);
                if(!module || !Array.isArray(module.actions)) {
                    return;
                }
    
                if(elem.tagName === "BUTTON") {
                    let buttonIndex = elem.dataset.buttonIndex;
                    let buttonInfo = module.actions[buttonIndex];
                    if(buttonInfo) {
                        callAction(buttonInfo, module, elem, scope);
                    }
                }
    
                if(elem.tagName === "A") {
                    let actionName = elem.dataset.actionName;
                    if(isEmpty(actionName)) {
                        console.error("actionName is null.");
                        return;
                    }
                    let buttonInfo = module.actions.find(b => b.actionName === actionName);
                    callAction(buttonInfo, module, elem, scope);
                }
            });
    
            on(godDetailPanel, "change", e => {
                if(godInfo.requestStart) {
                    return;
                }
                let elem = e.target;
                let value = elem.value;
                let result = parsePropertyName(elem.dataset.propertyName);
                if(!result) {
                    return;
                }
                let scope = result.scope;
                let propertyId = result.id;
                let module = getScopeInfo(scope);
                let properties;
                if(isEditorProperty(propertyId)) {
                    properties = getEditorProperties(scope);
                } else {
                    properties = module.properties;
                }

                if(properties) {
                    for(let i = 0; i < properties.length; i++) {
                        let propertyInfo = properties[i];
                        if(propertyInfo.id === propertyId) {
                            switch(propertyInfo.type) {
                                case "file":
                                    callAction(propertyInfo, module, elem, scope);
                                    break;
                                case "checkbox":
                                    let selectedValues = Array.isArray(propertyInfo.value) ? propertyInfo.value : [];
                                    if(elem.checked) {
                                        selectedValues.push(value);
                                    } else {
                                        selectedValues = selectedValues.filter(v => v !== value);
                                    }
                                    propertyInfo.value = selectedValues;
                                    break;
                                default:
                                    propertyInfo.value = 
                                        isFunction(propertyInfo.convertor)
                                            ? propertyInfo.convertor(value, propertyInfo)
                                            : value;
                                    if(Number.isNaN(propertyInfo.value)) {
                                        propertyInfo.value = null;
                                    }
                                    break;
                            }
                            // 更新依赖
                            updateDependency(scope, propertyInfo);  
                            return;
                        }
                    }
                }
            });
        })();
    }
    
    // 样式
    function insertStyle() {
        const style = document.createElement("style");
        style.rel = "stylesheet";
        style.textContent = `
        :root {
            --background-image: linear-gradient(200deg, rgb(0, 98, 255), rgb(66, 212, 241), rgb(250, 227, 129), rgb(205, 114, 3));
            --primary-color: ${theme.primaryColor};
            --font-color: ${theme.fontColor};
            --panel-color: ${theme.panelColor};
            --panel-font-color: ${theme.panelFontColor};
            --panel-border-color: ${theme.panelBorderColor};
            --menu-item-icon-bg-color: ${theme.menuItemIconBgColor};
            --menu-item-hover-color: ${theme.menuItemHoverColor};
            --menu-item-selected-color: ${theme.menuItemSelectedColor};
            --button-bg-color: ${theme.buttonBgColor};
            --button-active-bg-color: ${theme.buttonActiveBgColor};
            --star-color: ${theme.starColor};
            --textbox-border-color: ${theme.textboxBorderColor};
            --basic-bg-color: ${theme.basicBgColor};
            --basic-ft-color: ${theme.basicFtColor};
        }

        .app-default {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    visibility: block;
    transition: opacity 320ms cubic-bezier(.4, 0, .6, 1) 16ms;
}

.app-hide {
    opacity: 0;
    visibility: hidden;
    transition: opacity 320ms cubic-bezier(.4, 0, .6, 1) 0ms;
}

#godHandle {
    position: fixed;
    top: 20px;
    left: 50%;
    margin-left: -60px;
    display: block;
    width: 120px;
    height: 4px;
    background-color: var(--primary-color);
    overflow: hidden;
    border-radius: 4px;
    z-index: 10000;
    cursor: pointer;
}

#godHandle:active {
    background-color: var(--basic-ft-color);
}

.god-handle-default {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
    transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 0s, transform .32s cubic-bezier(.4, 0, .6, 1) 0s;
}

.god-handle-show {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition: opacity .32s cubic-bezier(.4, 0, .6, 1) .32s, transform .32s cubic-bezier(.4, 0, .6, 1) .32s;
}

#loadingElement {
    display: none;
}

div.loading-show {
    display: block !important;
}

/* 环形加载动画 */
.page-progress {
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 16px;
}

.page-progress.large {
    width: 96px;
    height: 96px;
    margin-top: -48px;
    margin-left: -48px;
}

.page-progress.circles {
    background-color: transparent;
    border: none;

    & .circle {
        box-sizing: border-box;
        display: inline-block;
        height: 100%;
        left: 0px;
        padding: 18px;
        opacity: 0;
        position: absolute;
        top: 0px;
        width: 100%;
        animation: circles 4.125s ease-in-out infinite;
    }

    & .circle::after {
        background-color: var(--primary-color);
        border-radius: 50%;
        content: "";
        display: block;
        position: absolute;
        height: 6px;
        width: 6px;
    }

    & :nth-child(1).circle {
        animation-delay: 0s;
    }

    & :nth-child(2).circle {
        animation-delay: 0.126s;
    }

    & :nth-child(3).circle {
        animation-delay: 0.252s;
    }

    & :nth-child(4).circle {
        animation-delay: 0.387s;
    }

    & :nth-child(5).circle {
        animation-delay: 0.504s;
    }

    & :nth-child(6).circle {
        animation-delay: 0.63s;
    }
}

@keyframes circles {
    0%{transform: rotate(-180deg);
        opacity: 0
    }
    13% {
        opacity: 0
    }
    26% {
        opacity: 1
    }
    74% {
        opacity: 1
    }
    87% {
        opacity: 0
    }
    100% {
    transform: rotate(585deg);
        opacity: 0
    }
}

div.god-panel-default {
    transform: translate3d(0, -100%, 0) scale3d(0.5, 0.5, 1);
    opacity: 0;
    transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 0ms, transform .32s cubic-bezier(.4, 0, .6, 1) 0ms;
}

div.god-panel-show {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
}

#godPanel {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #000;
    z-index: 990000;

    & .primary-color {
        color: var(--primary-color);
    }

    & > #godBackground {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: var(--background-image);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    & > #godContentPanel {
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        top: 20px;
        left: 20px;
        position: absolute;
        background-color: var(--panel-color);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
    }

    & #godPanelHeader {
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        flex: 0 0 40px;
        position: relative;

        & .header-ctrl-panel {
            position: absolute;
            width: 240px;
            height: 100%;
            overflow: hidden;

            & button {
                display: inline-block;
                position: absolute;
                width: 12px;
                height: 12px;
                overflow: hidden;
                border: 0;
                border-radius: 50%;
                top: 14px;
            }

            & button#redButton {
                left: 10px;
                background-color: rgb(255, 95, 87);
            }

            & button#redButton:active {
                background-color: rgb(163, 61, 55);
            }

            & button#yellowButton {
                left: 30px;
                background-color: rgb(253, 188, 46);
            }

            & button#yellowButton:active {
                background-color: rgb(171, 127, 30);
            }

            & button#greenButton {
                left: 50px;
                background-color: rgb(40, 200, 64);
            }

            & button#greenButton:active {
                background-color: rgb(24, 123, 39);
            }
        }
    }

    & .god-text {
        font-size: 16px;
    }

    & #godPanelContainer {
        width: 100%;
        flex: 1 1 auto;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        overflow: hidden;
    }

    & #godMenuPanel {
        flex: 0 0 240px;
        height: 100%;
        overflow: auto;

        & dl {
            width: 100%;
            height: auto;
            min-height: 0;
        }

        & dt {
            width: 100%;
            height: 40px;
            line-height: 40px;
            position: relative;

            & b {
                display: block;
                position: absolute;
                overflow: hidden;
                border-radius: 6px;
                top: 4px;
                left: 4px;
                right: 4px;
                bottom: 4px;
                background-color: var(--menu-item-hover-color);
                opacity: 0;
                transition: opacity 240ms cubic-bezier(.4, 0, .6, 1) 0ms;
                cursor: pointer;
            }

            & u {
                text-decoration: none;
                position: absolute;
                display: block;
            }

            & i {
                display: inline-block;
                vertical-align: top;
                width: 24px;
                height: 24px;
                margin-top: 8px;
                margin-left: 8px;
                margin-right: 8px;
                background-color: var(--menu-item-icon-bg-color);
                background-image: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgc3R5bGU9IndpZHRoOiAxZW07aGVpZ2h0OiAxZW07dmVydGljYWwtYWxpZ246IG1pZGRsZTtmaWxsOiBjdXJyZW50Q29sb3I7b3ZlcmZsb3c6IGhpZGRlbjsiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwLWlkPSIzNDQwIj48cGF0aCBkPSJNOTM3LjA2MiA2MjEuNjg4IDEwMjQgNjIxLjY4OCAxMDI0IDQwMi4yNWwtODYuOTM4IDBjLTg4LjE4OCAwLTEwOS4xODgtNTAuOTM4LTQ3LTExMy4xODhsNjEuNTYyLTYxLjU2Mi0xNTUuMTg4LTE1NS4xMjYtNjEuNSA2MS41Yy02Mi4zMTIgNjIuMzEyLTExMy4zMTIgNDEuMTg4LTExMy4xMjYtNDYuODc2IDAtMC4yNS0wLjEyNi0wLjM3Ni0wLjEyNi0wLjU2Mkw2MjEuNjg0IDAgNDAyLjM0NCAwbDAgODcuMjVjLTAuMjUgODcuODc2LTUxLjA2MiAxMDguODc2LTExMy4yODIgNDYuNjI2bC02MS41MzItNjEuNUw3Mi40MDYgMjI3LjVsNjEuNSA2MS41NjJjNjIuMjgyIDYyLjI1IDQxLjE1NiAxMTMuMTg4LTQ2Ljg3NiAxMTMuMTg4TDAgNDAyLjI1bDAgMjE5LjQzOCA4Ny4wMzIgMGM4OC4wMzIgMCAxMDkuMTU2IDUwLjkzOCA0Ni44NzYgMTEzLjI1bC02MS41IDYxLjUgMTU1LjEyNiAxNTUuMTg4IDYxLjUzMi02MS41NjJjNjIuMjE4LTYyLjE4OCAxMTMuMDMyLTQxLjE4OCAxMTMuMjgyIDQ2LjYyNkw0MDIuMzQ4IDEwMjRsMjE5LjM0NCAwIDAtODYuNDM4YzAtMC4xODggMC4xMjYtMC4zNzYgMC4xMjYtMC41NjItMC4xODgtODguMDYyIDUwLjgxMi0xMDkuMTI2IDExMy4xMjYtNDYuOTM4bDYxLjUgNjEuNTYyIDE1NS4xODgtMTU1LjE4OC02MS41NjItNjEuNUM4MjcuODc2IDY3Mi42MjYgODQ4Ljg3NiA2MjEuNjg4IDkzNy4wNjIgNjIxLjY4OHpNNTEyIDcwNGMtMTA2LjAzMiAwLTE5Mi04Ni0xOTItMTkyczg1Ljk2OC0xOTIgMTkyLTE5MmMxMDYgMCAxOTIgODYgMTkyIDE5MlM2MTggNzA0IDUxMiA3MDR6IiBwLWlkPSIzNDQxIj48L3BhdGg+PC9zdmc+");
                background-size: 16px 16px;
                background-repeat: no-repeat;
                background-position: center;
                overflow: hidden;
                border-radius: 50%;
            }

            & span {
                font-size: 14px;
            }

            & .extend-button {
                position: absolute;
                display: inline-block;
                width: 20px;
                height: 20px;
                overflow: hidden;
                background-color: rgba(255, 255, 255, 0);
                vertical-align: top;
                top: 10px;
                right: 10px;
                border-radius: 50%;
                text-align: center;
                transition: background-color .24s cubic-bezier(.4, 0, .6, 1) 0ms, transform .24s cubic-bezier(.4, 0, .6, 1) 0ms;
                cursor: pointer;
                transform: rotate3d(0, 0, -1, 0deg);
            }

            & .extend-button::after {
                content: "";
                width: 14px;
                height: 14px;
                margin-top: 4px;
                display: inline-block;
                vertical-align: top;
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E %3Cpath fill='%23000' d='M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z'%3E%3C/path%3E %3C/svg%3E") center no-repeat;
            }

            & .extend-button:hover {
                background-color: rgba(255, 255, 255, .4);
            }

            & .extend-button:active {
                background-color: rgba(255, 255, 255, .8);
            }

            & .extend-button-up {
                transform: rotate3d(0, 0, -1, 180deg);
            }
        }

        & dt:hover {
            & b {
                opacity: 1;
            }
        }

        & dt.menu-item-selected {
            & > b {
                background-color: var(--menu-item-selected-color) !important;
                opacity: 1;
                box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .3);
            }
        }

        & dd {
            width: 100%;
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            transition: all .32s cubic-bezier(.4, 0, .6, 1) 0ms;
        }

        & dd.submenu-opend {
            grid-template-rows: 1fr;
        }
    }

    & #godDetailPanel {
        flex: auto;
        background-color: rgba(255, 255, 255, .7);
        overflow: hidden;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-content: center;

        & .content-panel {
            flex: 1 1 auto;
            margin: 10px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        & .content-panel-actived {
            opacity: 1;
            transition: opacity .24s cubic-bezier(.4, 0, .6, 1) 0ms;
        }

        & .content-panel-disabled {
            opacity: .2;
        }

        & section.header-panel {
            width: 100%;
            height: 64px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            overflow: hidden;
            flex: none;
        }

        & .title-panel {
            flex: 1 1 auto;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            overflow: hidden;
        }

        & h1 {
            font-weight: normal;
            text-align: left;
            margin: 0;
            padding: 0;
            flex: auto 0 0;
            font-size: 1.6em;
        }

        & p {
            line-height: 1.2em;
            margin: 0;
            padding: 5px 0 5px 0;
            flex: auto;
            opacity: .6;
        }

        & section.button-panel {
            flex: none;
            height: 48px;
            line-height: 48px;
            text-align: center;
        }

        & .label-text {
            line-height: 32px;
            color: var(--primary-color);
        }

        & .required-star {
            line-height: 32px;
            color: var(--star-color);
            margin-left: 5px;
        }

        & hr.line {
            width: 200px;
            height: 1px;
            background-color: var(--primary-color);
            margin: 16px auto 16px auto;
            border: none;
        }

        & input, select {
            box-sizing: border-box;
            width: 200px;
            height: 32px;
            line-height: 32px;
            border: solid 1px var(--textbox-border-color);
            border-radius: 8px;
            padding-left: 2px;
            padding-right: 2px;
            outline: none;
            box-sizing: border-box;
        }

        & textarea {
            box-sizing: border-box;
            width: 200px;
            min-height: 128px;
            line-height: 24px;
            border: solid 1px var(--textbox-border-color);
            border-radius: 8px;
            padding-left: 2px;
            padding-right: 2px;
            overflow: auto;
            outline: none;
        }

        & input:focus, select:focus, textarea:focus {
            border-color: var(--primary-color);
        }

        & input[type=file] {
            top: -40px;
            left: -300px;
            position: absolute;
        }

        & input[type=checkbox] {
            width: 18px;
            height: 18px;
            line-height: 18px;
            border: solid 1px #666;
            border-radius: 4px;
            margin: 0;
            padding: 0;
            vertical-align: text-top;
            background-color: var(--basic-bg-color);
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }

        & input[type=checkbox]:checked {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
            background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJ3aWR0aDogMTJweDsgaGVpZ2h0OiAxMnB4OyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmVyc2lvbj0iMS4xIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDk1NC44NTcgMzIzLjQyOSBxIDAgMjIuODU3MSAtMTYgMzguODU3MSBsIC00MTMuNzE0IDQxMy43MTQgbCAtNzcuNzE0MyA3Ny43MTQzIHEgLTE2IDE2IC0zOC44NTcxIDE2IHQgLTM4Ljg1NzEgLTE2IGwgLTc3LjcxNDMgLTc3LjcxNDMgbCAtMjA2Ljg1NyAtMjA2Ljg1NyBxIC0xNiAtMTYgLTE2IC0zOC44NTcxIHQgMTYgLTM4Ljg1NzEgbCA3Ny43MTQzIC03Ny43MTQzIHEgMTYgLTE2IDM4Ljg1NzEgLTE2IHQgMzguODU3MSAxNiBsIDE2OCAxNjguNTcxIGwgMzc0Ljg1NyAtMzc1LjQyOSBxIDE2IC0xNiAzOC44NTcxIC0xNiB0IDM4Ljg1NzEgMTYgbCA3Ny43MTQzIDc3LjcxNDMgcSAxNiAxNiAxNiAzOC44NTcxIFoiIHAtaWQ9IjU3MjAiIC8+PC9zdmc+");
        }

        & .checkbox-text {
            line-height: 1.2em;
            font-size: 14px;
        }

        & div.checkbox-panel {
            display: grid;
            grid-template-columns: 24px 1fr;
            grid-gap: 10px 10px;
            align-items: start;
            width: 100%;
            height: auto;
        }

        & label.label-file {
            display: block;
            width: 200px;
            height: 32px;
            background-color: var(--button-bg-color);
            color: var(--primary-color);
            overflow: hidden;
            border-radius: 8px;
            border: none;
            text-align: center;
            line-height: 32px;
            position: relative;
        }

        & label.label-file:hover {
            background-color: var(--primary-color);
            color: var(--basic-bg-color);
        }

        & label.label-file:active {
            background-color: var(--button-active-bg-color);
            color: var(--basic-bg-color);
        }

        & button {
            min-width: 100px;
            height: 32px;
            background-color: var(--button-bg-color);
            color: var(--primary-color);
            overflow: hidden;
            border-radius: 8px;
            border: none;
            padding: 0 8px 0 8px;
            margin-left: 10px;
            vertical-align: top;
            margin-top: 12px;
        }

        & button:first-child {
            margin-left: 0;
        }

        & button:hover {
            background-color: var(--primary-color);
            color: var(--basic-bg-color);
        }

        & button:active {
            background-color: var(--button-active-bg-color);
            color: var(--basic-bg-color);
        }

        & section.body-group {
            flex: 1 1 auto;
            position: relative;
            overflow: hidden;
        }

        & section.body-panel {
            position: absolute;
            flex: none;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            height: 100%;
            width: 100%;
            opacity: 1;
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            transition: transform .32s cubic-bezier(.4, 0, .6, 1) 0s, opacity .32s cubic-bezier(.4, 0, .6, 1) 0s;
        }

        & section.move-hide {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale3d(.7, .7, 1);
        }

        & section.move-out {
            opacity: 0;
            transform: translate3d(100%, 0, 0) scale3d(1, 1, 1);
        }

        & section.move-in {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
        }

        & section.body-container {
            flex: 1 1 auto;
            display: flex;
            border: solid 1px var(--primary-color);
            box-sizing: border-box;
            border-radius: 6px;
            overflow: auto;
        }

        & section.form-panel {
            flex: 0 0 auto;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            overflow: auto;
        }

        & section.left-right {
            flex-direction: row;
        }

        & section.left-right .form-panel {
            flex-direction: column;
            width: 300px;
            height: 100%;
            border-right: solid 1px var(--primary-color);
        }

        & section.top-bottom {
            flex-direction: column;
        }

        & section.top-bottom .form-panel {
            flex-direction: row;
            width: 100%;
            min-height: 48px;
            border-bottom: solid 1px var(--primary-color);
        }

        /* 普通属性列表面板 */
        & .form-list {
            width: auto;
            height: auto;
            flex: none;
            min-height: 90%;
            max-width: 220px;
            margin: 0;
            padding: 0;

            & li {
                margin: 0 0 10px 0;
                padding: 0;
                list-style: none;
            }

            & li:first-child {
                margin: 20px 0 10px 0;
            }
        }

        /* 查询框面板 */
        & section.top-bottom {
            & .form-list {
                display: flex;
                flex-flow: row wrap;
                min-height: 0;
                max-width: 100%;
                height: auto;
                width: 100%;
                padding: 0 0 20px 0;

                & li, li:first-child {
                    margin: 0 0 0 20px;
                    flex: none;
                    width: 220px;
                }
            }
        }

        /* 结果集面板 */
        & section.result-panel {
            flex: 1 1 auto;
            flex-direction: column;
            overflow: auto;

            & .form-list {
                max-width: calc(100% - 40px);
                margin: auto;
                display: grid;
                grid-row-gap: 20px;
                grid-column-gap: 20px;
            }

            & li, li:first-child {
                margin: 0;
            }

            & input, select {
                width: 100%;
            }

            & textarea {
                width: 100%;
                min-height: calc(100% - 40px);
            }

            & a {
                color: var(--primary-color);
                text-decoration: none;
            }

            & a:hover {
                text-decoration: underline;
            }

            & div.result-title {
                flex: 1 1 100%;
                height: 32px;
                line-height: 32px;
                margin-top: 10px;

                & span {
                    margin-left: 6px;
                    color: var(--primary-color);
                }

                & .result-title-marker {
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 12px;
                    width: 6px;
                    height: 6px;
                    overflow: hidden;
                    border-radius: 50%;
                    background-color: var(--primary-color);
                    margin-left: 10px;
                }
            }

            & div.result-content {
                width: 100%;
                height: auto;
                margin-bottom: 20px;
            }

            & div.result-item-group {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }

            & div.result-item {
                width: auto;
                height: 40px;
                background-color: var(--basic-bg-color);
                border-radius: 6px;
                padding: 0 10px 0 10px;
                margin-top: 10px;
                margin-left: 10px;
                display: flex;
                flex-direction: row;
                overflow: hidden;

                & label {
                    text-align: center;
                    line-height: 40px;
                    margin-left: 5px;
                    flex: none;
                }

                & .before::before {
                    content: '|';
                    margin-left: 5px;
                    margin-right: 5px;
                    flex: none;
                }

                & span {
                    line-height: 40px;
                    flex: none;
                }
            }

            & .result-content-panel {
                width: calc(100% - 20px);
                height: auto;
                margin: 10px auto 10px auto;
                border-radius: 6px;
                overflow: hidden;
                display: flex;
            }

            & .result-content-border {
                border: solid 1px var(--primary-color);
                box-sizing: border-box;
            }

            & .table-view {
                table-layout: fixed;
                width: 100% ;
                border-spacing: 0;
                border-collapse: collapse;

                & .table-view-row {
                    transition: background-color 240ms cubic-bezier(.4, 0, .6, 1) 0ms;
                }

                & .table-view-row:hover {
                    background-color: var(--basic-bg-color);
                    color: var(--primary-color);
                }

                & .table-view-th, .table-view-td {
                    padding: 0 5px 0 5px;
                    height: 40px;
                    line-height: 40px;
                    font-weight: normal;
                    border-bottom: solid 1px var(--primary-color);
                    border-right: solid 1px var(--primary-color);
                    word-break: break-all;
                    word-wrap: break-word;
                }

                & .table-view-th:last-child, .table-view-td:last-child {
                    border-right: none 0;
                }

                & .table-view-row:last-child .table-view-td {
                    border-bottom: none 0;
                }

                & .table-view-td {
                    & a {
                        margin-left: 10px;
                        cursor: pointer;
                    }

                    & a:first-child {
                        margin-left: 0;
                    }
                }

                & .table-view-th {
                    color: var(--primary-color);
                    background-color: var(--basic-bg-color);
                    font-weight: bold;
                }
            }

            & .page-button-panel {
                height: 48px;
                width: auto;
                max-width: 100%;
                line-height: 48px;
                border-radius: 24px;
                background-color: var(--basic-bg-color);
                margin:10px auto 10px auto;

                & .page-button, .page-button-selected, .page-text {
                    min-width: 32px;
                    height: 32px;
                    line-height: 32px;
                    display: inline-block;
                    margin: 0 10px 0 10px;
                    text-align: center;
                    color: var(--primary-color);
                }

                & .page-text {
                    color: var(--basic-ft-color);
                }

                & .page-button-selected {
                    border-radius: 50%;
                    background-color: var(--primary-color);
                    color: #fff;
                }
            }

            & .image-view {
                width: 100%;
                vertical-align: top;
            }
        }
    }
}
        `;
        
        document.getElementsByTagName("head").item(0).appendChild(style);
    }
    
    // 初始化
    function insertGodPanel() {
        godInfo.app = document.getElementById("app");
        if(godInfo.app) {
            godInfo.app.classList.add("app-default");
        }

        const template = `
            <div id="godPanel" class="god-panel-default">
                <div id="godBackground"></div>
                <div id="godContentPanel">
                    <div id="godPanelHeader">
                        <div class="header-ctrl-panel">
                            <button id="redButton"></button>
                            <button id="yellowButton"></button>
                            <button id="greenButton"></button>
                        </div>
                        <span class="god-text">I AM THE GOD PANEL</span>
                    </div>
                    <div id="godPanelContainer">
                        <div id="godMenuPanel"></div>
                        <div id="godDetailPanel">
                            <div class="content-panel" style="justify-content:center">
                                <h1 class="primary-color" style="text-align:center;">
                                    Welcome to the DateSet Tools<br>
                                    <span>${godInfo.version}</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a id="godHandle" class="god-handle-default"></a>
        `;

        appendHtml(template);

        godInfo.godBackground = document.getElementById("godBackground");
        godInfo.godContentPanel = document.getElementById("godContentPanel");

        let loadingValue = 0;
        let loadingTimeout = null;
        Object.defineProperty(godInfo, "loading", {
            configurable: true,
            enumerable: true,
            get: () => {
                return loadingValue > 0;
            },
            set: val => {
                if(!!val) {
                    loadingValue++;
                    if(loadingValue === 1) {
                        loadingTimeout = setTimeout(() => {
                            loadingTimeout = null;
                            document.getElementById("loadingElement")?.classList.add("loading-show");
                            document.getElementById("detailContentPanel")?.classList.add("content-panel-disabled");
                        }, 1000);
                    }
                } else {
                    if(loadingValue > 0) {
                        loadingValue--;
                        if(loadingValue === 0) {
                            if(loadingTimeout) {
                                clearTimeout(loadingTimeout);
                                loadingTimeout = null;
                            }
                            document.getElementById("loadingElement")?.classList.remove("loading-show");
                            document.getElementById("detailContentPanel")?.classList.remove("content-panel-disabled");
                        }
                    }
                }
            }
        });

        godInfo.godMenuPanel = document.getElementById("godMenuPanel");
        godInfo.godDetailPanel = document.getElementById("godDetailPanel");
        initModules(godInfo.godMenuPanel, godInfo.godDetailPanel, godInfo.modules);

        const godPanel = document.getElementById("godPanel");
        const godHandle = document.getElementById("godHandle");

        function godPanelShow() {
            godPanel.classList.add("god-panel-show");
            godHandle.classList.remove("god-handle-show");
            if(godInfo.app) {
                godInfo.app.classList.add("app-hide");
            }
        }

        function godPanelHide() {
            godPanel.classList.remove("god-panel-show");
            godHandle.classList.add("god-handle-show");
            if(godInfo.app) {
                setTimeout(() => {
                    godInfo.app.classList.remove("app-hide");
                }, 320);
            }
        }

        if(godPanel && godHandle) {
            const appDisplayValue = godInfo.app ? godInfo.app.style.display : "block";
            // transitionend, transitionstart, transitioncancel
            on(godPanel, "transitionstart", event => {
                if(!godPanel.classList.contains("god-panel-show")) {
                    if(godInfo.app) {
                        godInfo.app.style.display = appDisplayValue;
                    }
                }
            });
            on(godPanel, "transitionend", event => {
                if(godPanel.classList.contains("god-panel-show")) {
                    if(godInfo.app) {
                        godInfo.app.style.display = "none";
                    }
                }
            });
            on(godHandle, "click", e => godPanelShow());
            godPanelShow();

            const redButton = document.getElementById("redButton");
            if(redButton) {
                on(redButton, "click", e => godPanelHide());
            }
        }

        //#endregion
    }

    ready(() => {
        insertStyle();
        insertGodPanel();
    }, !!document.body);

})();
