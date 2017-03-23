/**
 * Created by Raykid on 2017/3/16.
 */
import * as fs from "fs";

export function parseConfig(root:string, langs:string[]):Lang[]
{
    let configs:Lang[] = [];
    for(let i:number = 0, len:number = langs.length; i < len; i++)
    {
        var lang:string = langs[i];
        let configStr:string = fs.readFileSync(root + "/configs/" + lang + "/config.json", "utf-8");
        let config:Lang = JSON.parse(configStr);
        config.name = lang;
        // 解析types，将from变为正则表达式
        let regStr:RegExp = /^[a-zA-Z0-9_]+$/;
        for(let type of config.types)
        {
            // 如果from属性是正则字符串，则直接转变为正则表达式对象
            if(!regStr.test(type.from as string))
            {
                type.from = new RegExp(type.from as string);
            }
            // 填充默认的customNames
            type.customNames = [];
        }
        // 解析templates，将file指向的文件内容加载到content属性中
        for(let template of config.templates)
        {
            template.content = fs.readFileSync(root + "/configs/" + lang + "/" + template.file, "utf-8");
        }
        // 解析include和exclude
        config.include = config.include || [];
        config.exclude = config.exclude || [];
        // 插入数组
        configs.push(config);
        // 日志
        console.log(`读取语言配置[${lang}]成功`);
    }
    return configs;
}

export interface Lang
{
    name:string;
    types:LangType[];
    templates:LangTemplate[];
    include:string[];
    exclude:string[];
}

export interface LangType
{
    from:string|RegExp;
    to:string;
    class:string;
    customNames:string[];
}

export interface LangTemplate
{
    field:string;
    file:string;
    content:string;// file指定文件的内容
    saveName:string;
}