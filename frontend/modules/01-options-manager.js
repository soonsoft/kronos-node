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
                    ctx.jsonRender("暂无数据");
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
})