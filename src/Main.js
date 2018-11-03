"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/16.
 */
var langParser = require("./lang/LangParser");
var configParser = require("./config/ConfigParser");
var templateReplacer = require("./template/TemplateReplacer");
var fileSystemUtil = require("./file/FileSystemUtil");
if (process.argv.length > 2) {
    // 调用方法
    run.apply(void 0, [process.argv[2], process.argv[3]].concat(process.argv.slice(4)));
}
function run(root, out) {
    var langs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        langs[_i - 2] = arguments[_i];
    }
    // 首先读取语言配置
    var langConfigs = langParser.parseConfig(root, langs);
    // 日志
    console.log("\u8BED\u8A00\u914D\u7F6E\u8BFB\u53D6\u5B8C\u6BD5");
    // 其次读取消息配置
    var tempConfig = configParser.parserConfig(root);
    // 日志
    console.log("\u6D88\u606F\u914D\u7F6E\u8BFB\u53D6\u5B8C\u6BD5");
    // 重建out文件夹
    fileSystemUtil.emptyFolder(out);
    // 最后遍历进行替换
    for (var _a = 0, langConfigs_1 = langConfigs; _a < langConfigs_1.length; _a++) {
        var langConf = langConfigs_1[_a];
        // 根据语言的黑白名单生成语言专用的模板配置数组
        var langTempConfig = configParser.filterConfigs(tempConfig, langConf.include, langConf.exclude);
        // 语言固定了
        for (var _b = 0, _c = langConf.templates; _b < _c.length; _b++) {
            var template = _c[_b];
            // 模板固定了，使用模板中的作用域获取配置
            if (template.field == "global") {
                // 是全局域，直接使用langTempConfig生成代码
                var res = templateReplacer.replaceTemplate(langConf.types, template, langTempConfig, langTempConfig);
                fileSystemUtil.saveFile(out, langConf.name, res.saveName, res.content);
                // 日志
                console.log("\u751F\u6210[" + langConf.name + "]\u6587\u4EF6[" + res.saveName + "]\u6210\u529F");
            }
            else {
                // 不是全局域，使用特定域下的配置生成代码
                var confs = langTempConfig[template.field];
                for (var _d = 0, confs_1 = confs; _d < confs_1.length; _d++) {
                    var conf = confs_1[_d];
                    // 消息配置固定了
                    var res = templateReplacer.replaceTemplate(langConf.types, template, langTempConfig, conf);
                    fileSystemUtil.saveFile(out, langConf.name, res.saveName, res.content);
                    // 日志
                    console.log("\u751F\u6210[" + langConf.name + "]\u6587\u4EF6[" + res.saveName + "]\u6210\u529F");
                }
            }
        }
    }
}
exports.run = run;
