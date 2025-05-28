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
}