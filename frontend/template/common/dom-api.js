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