/// <reference path="node.d.ts"/>

/**
 * Created by Raykid on 2017/3/16.
 */
import langParser = require("./lang/LangParser");
import configParser = require("./config/ConfigParser");
import templateReplacer = require("./template/TemplateReplacer");

// 获取进程参数
let args:string[] = process.argv.slice(2);
// TODO Raykid 测试代码
args = ["../test", "ts"];
let root:string = args[0];
// 首先读取语言配置
let langConfigs:langParser.Config[] = [];
for(let i:number = 1, len:number = args.length; i < len; i++)
{
    let config:langParser.Config = langParser.parseConfig(root, args[i]);
    langConfigs.push(config);
}
// 其次读取消息配置
let tempConfig:configParser.ConfigDict = configParser.parserConfig(root);
// 最后遍历进行替换
for(let langConf:langParser.Config of langConfigs)
{
    // 语言固定了
    for(let template:langParser.ConfigTemplate of langConf.templates)
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
            for(let conf:configParser.Config of confs)
            {
                // 消息配置固定了
                let res:templateReplacer.TemplateResult = templateReplacer.replaceTemplate(langConf.types, template, conf);
                console.log(res.content);
            }
        }
    }
}
