
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
}