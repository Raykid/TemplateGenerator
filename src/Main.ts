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
// args = ["../test", "../out", "ts"];

let root:string = args[0];
let out:string = args[1];
// 首先读取语言配置
let langConfigs:langParser.Lang[] = [];
for(let i:number = 2, len:number = args.length; i < len; i++)
{
    let config:langParser.Lang = langParser.parseConfig(root, args[i]);
    langConfigs.push(config);
}
// 其次读取消息配置
let tempConfig:configParser.ConfigDict = configParser.parserConfig(root);
// 重建out文件夹
fileSystemUtil.emptyFolder(out);
// 最后遍历进行替换
for(let langConf of langConfigs)
{
    // 语言固定了
    for(let template of langConf.templates)
    {
        // 模板固定了，使用模板中的作用域获取配置
        if(template.field == "global")
        {
            // 是全局域，直接使用tempConfig生成代码
            let res:templateReplacer.TemplateResult = templateReplacer.replaceTemplate(langConf.types, template, tempConfig);
            console.log(res);
        }
        else
        {
            // 不是全局域，使用特定域下的配置生成代码
            var confs:configParser.Config[] = tempConfig[template.field];
            for(let conf of confs)
            {
                // 消息配置固定了
                let res:templateReplacer.TemplateResult = templateReplacer.replaceTemplate(langConf.types, template, conf);
                fileSystemUtil.saveFile(out, langConf.name, res.saveName, res.content);
            }
        }
    }
}
