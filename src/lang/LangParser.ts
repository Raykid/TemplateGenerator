/**
 * Created by Raykid on 2017/3/16.
 */
import * as fs from "fs";

export function parseConfig(root:string, langStr:string):Lang
{
    let configStr:string = fs.readFileSync(root + "/configs/" + langStr + "/config.json", "utf-8");
    let config:Lang = JSON.parse(configStr);
    config.name = langStr;
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
    // 解析templates，将file指向的文件内容加载进来替换file属性
    for(let template of config.templates)
    {
        template.file = fs.readFileSync(root + "/configs/" + langStr + "/" + template.file, "utf-8");
    }
    // 返回Config对象
    return config;
}

export interface Lang
{
    name:string;
    types:LangType[];
    templates:LangTemplate[];
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
    saveName:string;
}