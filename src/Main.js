/// <reference path="node.d.ts"/>
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/16.
 */
const langParser = require("./lang/LangParser");
const configParser = require("./config/ConfigParser");
const templateReplacer = require("./template/TemplateReplacer");
const fileSystemUtil = require("./file/FileSystemUtil");
// 获取进程参数
let args = process.argv.slice(2);
// 下面打开就是测试代码
// args = ["../test", "../out", "ts"];
let root = args[0];
let out = args[1];
// 首先读取语言配置
let langConfigs = [];
for (let i = 2, len = args.length; i < len; i++) {
    let config = langParser.parseConfig(root, args[i]);
    langConfigs.push(config);
}
// 其次读取消息配置
let tempConfig = configParser.parserConfig(root);
// 重建out文件夹
fileSystemUtil.emptyFolder(out);
// 最后遍历进行替换
for (let langConf of langConfigs) {
    // 语言固定了
    for (let template of langConf.templates) {
        // 模板固定了，使用模板中的作用域获取配置
        if (template.field == "global") {
            // 是全局域，直接使用tempConfig生成代码
            let res = templateReplacer.replaceTemplate(langConf.types, template, tempConfig);
            console.log(res);
        }
        else {
            // 不是全局域，使用特定域下的配置生成代码
            var confs = tempConfig[template.field];
            for (let conf of confs) {
                // 消息配置固定了
                let res = templateReplacer.replaceTemplate(langConf.types, template, conf);
                fileSystemUtil.saveFile(out, langConf.name, res.saveName, res.content);
            }
        }
    }
}
//# sourceMappingURL=Main.js.map