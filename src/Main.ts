/// <reference path="node.d.ts"/>

/**
 * Created by Raykid on 2017/3/16.
 */
import langParser = require("./lang/LangParser");
import configParser = require("./config/ConfigParser");
import templateReplacer = require("./template/TemplateReplacer");
import fileSystemUtil = require("./file/FileSystemUtil");

// 获取进程参数
let args:string[] = process.argv.slice(2);

// 下面打开就是测试代码
// if(args.length <= 0) args = ["../test", "../out", "ts"];

let root:string = args[0];
let out:string = args[1];
// 首先读取语言配置
var langs:string[] = args.slice(2);
let langConfigs:langParser.Lang[] = langParser.parseConfig(root, langs);
// 日志
console.log(`语言配置读取完毕`);
// 其次读取消息配置
let tempConfig:configParser.ConfigDict = configParser.parserConfig(root);
// 日志
console.log(`消息配置读取完毕`);
// 重建out文件夹
fileSystemUtil.emptyFolder(out);
// 最后遍历进行替换
for(let langConf of langConfigs)
{
    // 根据语言的黑白名单生成语言专用的模板配置数组
    let langTempConfig:configParser.ConfigDict = configParser.filterConfigs(tempConfig, langConf.include, langConf.exclude);
    // 语言固定了
    for(let template of langConf.templates)
    {
        // 模板固定了，使用模板中的作用域获取配置
        if(template.field == "global")
        {
            // 是全局域，直接使用langTempConfig生成代码
            let res:templateReplacer.TemplateResult = templateReplacer.replaceTemplate(langConf.types, template, langTempConfig, langTempConfig);
            fileSystemUtil.saveFile(out, langConf.name, res.saveName, res.content);
            // 日志
            console.log(`生成[${langConf.name}]文件[${res.saveName}]成功`);
        }
        else
        {
            // 不是全局域，使用特定域下的配置生成代码
            var confs:configParser.Config[] = langTempConfig[template.field];
            for(let conf of confs)
            {
                // 消息配置固定了
                let res:templateReplacer.TemplateResult = templateReplacer.replaceTemplate(langConf.types, template, langTempConfig, conf);
                fileSystemUtil.saveFile(out, langConf.name, res.saveName, res.content);
                // 日志
                console.log(`生成[${langConf.name}]文件[${res.saveName}]成功`);
            }
        }
    }
}
