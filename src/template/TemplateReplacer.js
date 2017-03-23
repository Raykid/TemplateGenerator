"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ares = require("../../libs/ares.js");
var ares_template = require("../../libs/ares_template.js");
function replaceTemplate(typeDict, template, confDict, conf) {
    // 复制一份conf，将其中的类型改了
    var newConf = {};
    for (var key in conf) {
        var value = conf[key];
        if (key == "fields") {
            // 需要将fields里面的所有类型进行一次转换
            value = value.map(function (field) {
                var newField = {};
                for (var key_1 in field) {
                    newField[key_1] = field[key_1];
                }
                // 特别处理type属性
                newField.oriType = newField.type;
                newField.type = transformType(newField.type);
                return newField;
            }, this);
        }
        newConf[key] = value;
    }
    // 添加一些工具方法
    newConf.getConfigByName = getConfigByName;
    newConf.getCustomTypes = getCustomTypes;
    newConf.removeDuplicate = removeDuplicate;
    newConf.transformType = transformType;
    // 准备结果
    var res = {
        saveName: null,
        content: null
    };
    // 替换文件名
    ares.bind(newConf, new ares_template.TemplateCompiler(template.saveName, function (text) {
        res.saveName = text;
    }));
    // 替换内容
    ares.bind(newConf, new ares_template.TemplateCompiler(template.content, function (text) {
        res.content = text;
    }));
    // 返回结果
    return res;
    /**************** 下面是工具方法 ****************/
    function getConfigByName(name) {
        for (var field in confDict) {
            var confs = confDict[field];
            for (var i = 0, len = confs.length; i < len; i++) {
                var conf_1 = confs[i];
                if (conf_1.name == name)
                    return conf_1;
            }
        }
        return null;
    }
    function getCustomTypes(fields) {
        var customTypes = [];
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            customTypes = customTypes.concat(field.type.customTypes);
        }
        return removeDuplicate(customTypes);
    }
    function removeDuplicate(list) {
        var tempList = [];
        for (var i = 0, lenI = list.length; i < lenI; i++) {
            var item = list[i];
            for (var j = 0, lenJ = tempList.length; j < lenJ; j++) {
                var tempItem = tempList[j];
                if (tempItem.from == item.from && tempItem.to == item.to && tempItem.class == item.class) {
                    list.splice(i, 1);
                    i--;
                    lenI--;
                }
            }
            tempList.push(item);
        }
        return list;
    }
    function transformType(type) {
        for (var _i = 0, typeDict_1 = typeDict; _i < typeDict_1.length; _i++) {
            var conf_2 = typeDict_1[_i];
            if (conf_2.from == type) {
                return conf_2;
            }
            else if (conf_2.from instanceof RegExp) {
                var res_1 = conf_2.from.exec(type);
                if (res_1) {
                    var customTypes = [];
                    var tempStrs = [];
                    var tempStr = res_1[0];
                    // 将整个段落的前面部分推入数组
                    tempStrs.push(type.substring(0, res_1.index));
                    for (var i = 1, len = res_1.length; i < len; i++) {
                        var before = res_1[i];
                        var subType = transformType(before);
                        var after = subType.to;
                        var index = tempStr.indexOf(before);
                        var count = before.length;
                        // 将before前面的部分推入数组
                        tempStrs.push(tempStr.substring(0, index));
                        // 将after推入数组
                        tempStrs.push(after);
                        // 截断tempStr
                        tempStr = tempStr.substr(index + count);
                        // 连接customTypes
                        customTypes = customTypes.concat(subType.customTypes);
                        // 如果subType是customType则将其推入数组
                        if (subType.class == "custom")
                            customTypes.push(subType);
                    }
                    // 将customTypes做一次去重
                    customTypes = removeDuplicate(customTypes);
                    // 将tempStr剩余部分推入数组
                    tempStrs.push(tempStr);
                    // 将整个段落的后面部分推入数组
                    tempStrs.push(type.substr(res_1.index + res_1[0].length));
                    // 使用连接起来的字符串进行替换
                    var newType = tempStrs.join("");
                    return {
                        from: type,
                        to: newType.replace(conf_2.from, conf_2.to),
                        class: conf_2.class,
                        customTypes: customTypes
                    };
                }
            }
        }
        // 返回未知类型
        return {
            from: type,
            to: type,
            class: "custom",
            customTypes: []
        };
    }
}
exports.replaceTemplate = replaceTemplate;
//# sourceMappingURL=TemplateReplacer.js.map