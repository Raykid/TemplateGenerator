/// <reference path="node.d.ts"/>
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/16.
 */
var langParser = require("./lang/LangParser");
var configParser = require("./config/ConfigParser");
var templateReplacer = require("./template/TemplateReplacer");
var fileSystemUtil = require("./file/FileSystemUtil");
// 获取进程参数
var args = process.argv.slice(2);
// 下面打开就是测试代码
// args = ["../test", "../out", "ts"];
var root = args[0];
var out = args[1];
// 首先读取语言配置
var langConfigs = [];
for (var i = 2, len = args.length; i < len; i++) {
    var config = langParser.parseConfig(root, args[i]);
    langConfigs.push(config);
}
// 其次读取消息配置
var tempConfig = configParser.parserConfig(root);
// 重建out文件夹
fileSystemUtil.emptyFolder(out);
// 最后遍历进行替换
for (var _i = 0, langConfigs_1 = langConfigs; _i < langConfigs_1.length; _i++) {
    var langConf = langConfigs_1[_i];
    // 语言固定了
    for (var _a = 0, _b = langConf.templates; _a < _b.length; _a++) {
        var template = _b[_a];
        // 模板固定了，使用模板中的作用域获取配置
        if (template.field == "global") {
            // 是全局域，直接使用tempConfig生成代码
            var res = templateReplacer.replaceTemplate(langConf.types, template, tempConfig);
            console.log(res);
        }
        else {
            // 不是全局域，使用特定域下的配置生成代码
            var confs = tempConfig[template.field];
            for (var _c = 0, confs_1 = confs; _c < confs_1.length; _c++) {
                var conf = confs_1[_c];
                // 消息配置固定了
                var res = templateReplacer.replaceTemplate(langConf.types, template, conf);
                fileSystemUtil.saveFile(out, langConf.name, res.saveName, res.content);
            }
        }
    }
}
//# sourceMappingURL=Main.js.map