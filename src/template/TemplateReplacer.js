/**
 * Created by Raykid on 2017/3/20.
 */
var ares = require("../../libs/ares.js");
var ares_template = require("../../libs/ares_template.js");
function replaceTemplate(typeDict, template, conf) {
    // 复制一份conf，将其中的类型改了
    let newConf = {};
    for (let key in conf) {
        var value = conf[key];
        if (key == "fields") {
            // 需要将fields里面的所有类型进行一次转换
            value = value.map(field => {
                let newField = {};
                for (let key in field) {
                    newField[key] = field[key];
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
    newConf.getCustomNames = getCustomNames;
    newConf.removeDuplicate = removeDuplicate;
    newConf.transformType = transformType;
    // 准备结果
    let res = {};
    // 替换文件名
    ares.bind(newConf, new ares_template.TemplateCompiler(template.saveName, (text) => {
        res.saveName = text;
    }));
    // 替换内容
    ares.bind(newConf, new ares_template.TemplateCompiler(template.file, (text) => {
        res.content = text;
    }));
    // 返回结果
    return res;
    /**************** 下面是工具方法 ****************/
    function getCustomNames(fields) {
        let customNames = [];
        for (let field of fields) {
            customNames = customNames.concat(field.type.customNames);
        }
        return removeDuplicate(customNames);
    }
    function removeDuplicate(list) {
        let tempList = [];
        for (var i = 0, len = list.length; i < len; i++) {
            let item = list[i];
            if (tempList.indexOf(item) >= 0) {
                list.splice(i, 1);
                i--;
                len--;
            }
            tempList.push(item);
        }
        return list;
    }
    function transformType(type) {
        for (let conf of typeDict) {
            if (conf.from == type) {
                return conf;
            }
            else if (conf.from instanceof RegExp) {
                var res = conf.from.exec(type);
                if (res) {
                    let customNames = [];
                    let tempStrs = [];
                    let tempStr = res[0];
                    // 将整个段落的前面部分推入数组
                    tempStrs.push(type.substring(0, res.index));
                    for (var i = 1, len = res.length; i < len; i++) {
                        let before = res[i];
                        var subType = transformType(before);
                        let after = subType.to;
                        let index = tempStr.indexOf(before);
                        let count = before.length;
                        // 将before前面的部分推入数组
                        tempStrs.push(tempStr.substring(0, index));
                        // 将after推入数组
                        tempStrs.push(after);
                        // 截断tempStr
                        tempStr = tempStr.substr(index + count);
                        // 连接customNames
                        customNames = customNames.concat(subType.customNames);
                    }
                    // 将customNames做一次去重
                    customNames = removeDuplicate(customNames);
                    // 将tempStr剩余部分推入数组
                    tempStrs.push(tempStr);
                    // 将整个段落的后面部分推入数组
                    tempStrs.push(type.substr(res.index + res[0].length));
                    // 使用连接起来的字符串进行替换
                    let newType = tempStrs.join("");
                    return {
                        from: type,
                        to: newType.replace(conf.from, conf.to),
                        class: conf.class,
                        customNames: customNames
                    };
                }
            }
        }
        // 返回未知类型
        return {
            from: type,
            to: type,
            class: "custom",
            customNames: [type]
        };
    }
}
exports.replaceTemplate = replaceTemplate;
//# sourceMappingURL=TemplateReplacer.js.map