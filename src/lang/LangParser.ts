/**
 * Created by Raykid on 2017/3/16.
 */
import fs = require("fs");

export function parseConfig(root:string, langStr:string):Config
{
    let configStr:string = fs.readFileSync(root + "/configs/" + langStr + "/config.json", "utf-8");
    let config:Config = JSON.parse(configStr);
    // 解析types，将from变为正则表达式
    let regStr:RegExp = /^[a-zA-Z0-9_]+$/;
    for(let type:ConfigType of config.types)
    {
        // 如果from属性是正则字符串，则直接转变为正则表达式对象
        if(!regStr.test(type.from as string))
        {
            type.from = new RegExp(type.from);
        }
        // 填充默认的customNames
        type.customNames = [];
    }
    // 解析templates，将file指向的文件内容加载进来替换file属性
    for(let template:ConfigTemplate of config.templates)
    {
        template.file = fs.readFileSync(root + "/configs/" + langStr + "/" + template.file, "utf-8");
    }
    // 返回Config对象
    return config;
}

export interface Config
{
    types:ConfigType[];
    templates:ConfigTemplate[];
}

export interface ConfigType
{
    from:string|RegExp;
    to:string;
    class:string;
    customNames:string[];
}

export interface ConfigTemplate
{
    field:string;
    file:string;
    saveName:string;
}