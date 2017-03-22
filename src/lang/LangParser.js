"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/16.
 */
var fs = require("fs");
function parseConfig(root, langStr) {
    var configStr = fs.readFileSync(root + "/configs/" + langStr + "/config.json", "utf-8");
    var config = JSON.parse(configStr);
    config.name = langStr;
    // 解析types，将from变为正则表达式
    var regStr = /^[a-zA-Z0-9_]+$/;
    for (var _i = 0, _a = config.types; _i < _a.length; _i++) {
        var type = _a[_i];
        // 如果from属性是正则字符串，则直接转变为正则表达式对象
        if (!regStr.test(type.from)) {
            type.from = new RegExp(type.from);
        }
        // 填充默认的customNames
        type.customNames = [];
    }
    // 解析templates，将file指向的文件内容加载进来替换file属性
    for (var _b = 0, _c = config.templates; _b < _c.length; _b++) {
        var template = _c[_b];
        template.file = fs.readFileSync(root + "/configs/" + langStr + "/" + template.file, "utf-8");
    }
    // 返回Config对象
    return config;
}
exports.parseConfig = parseConfig;
//# sourceMappingURL=LangParser.js.map