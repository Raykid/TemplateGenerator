"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/16.
 */
var fs = require("fs");
var path = require("path");
function parseConfig(root, langs) {
    var configs = [];
    for (var i = 0, len = langs.length; i < len; i++) {
        var lang = langs[i];
        var url = path.join(root, "configs", lang, "config.json");
        if (!fs.existsSync(url)) {
            console.warn("\u6CA1\u6709\u627E\u5230[" + lang + "]\u8BED\u8A00\u7684\u914D\u7F6E\u6587\u4EF6");
            continue;
        }
        var configStr = fs.readFileSync(url, "utf-8");
        var config = JSON.parse(configStr);
        config.name = lang;
        // 解析types，将from变为正则表达式
        var regStr = /^[a-zA-Z0-9_]+$/;
        for (var _i = 0, _a = config.types; _i < _a.length; _i++) {
            var type = _a[_i];
            // 如果from属性是正则字符串，则直接转变为正则表达式对象
            if (!regStr.test(type.from)) {
                type.from = new RegExp(type.from);
            }
            // 设置isCustom
            type.customName = null;
            // 填充默认的customTypes
            type.subCustomNames = [];
        }
        // 解析templates，将file指向的文件内容加载到content属性中
        for (var _b = 0, _c = config.templates; _b < _c.length; _b++) {
            var template = _c[_b];
            template.content = fs.readFileSync(root + "/configs/" + lang + "/" + template.file, "utf-8");
        }
        // 解析include和exclude
        config.include = config.include || [];
        config.exclude = config.exclude || [];
        // 插入数组
        configs.push(config);
        // 日志
        console.log("\u8BFB\u53D6\u8BED\u8A00\u914D\u7F6E[" + lang + "]\u6210\u529F");
    }
    return configs;
}
exports.parseConfig = parseConfig;
