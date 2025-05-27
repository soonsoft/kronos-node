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
})