;(function() {
    const IdSymbol = Symbol("Id");

    // {{resources}} //

    // {{common}} //

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

    // {{modules}} //

    //#region Http Request

    // {{http}} //

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

        // {{renders}} //

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

        // {{css-style}} //
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
