/**
 * Created by Raykid on 2017/3/16.
 */
var fs = require("fs");
function parseConfig(root, langStr) {
    let configStr = fs.readFileSync(root + "/configs/" + langStr + "/config.json", "utf-8");
    let config = JSON.parse(configStr);
    // 解析types，将from变为正则表达式
    let regStr = /^[a-zA-Z0-9_]+$/;
    for (let type of config.types) {
        // 如果from属性是正则字符串，则直接转变为正则表达式对象
        if (!regStr.test(type.from)) {
            type.from = new RegExp(type.from);
        }
        // 填充默认的customNames
        type.customNames = [];
    }
    // 解析templates，将file指向的文件内容加载进来替换file属性
    for (let template of config.templates) {
        template.file = fs.readFileSync(root + "/configs/" + langStr + "/" + template.file, "utf-8");
    }
    // 返回Config对象
    return config;
}
exports.parseConfig = parseConfig;
//# sourceMappingURL=LangParser.js.map