/**
 * Created by Raykid on 2017/3/17.
 */
import * as fs from "fs";
var ares = require("../../libs/ares.js");
var ares_template = require("../../libs/ares_template.js");

export function parserConfig(root:string):ConfigDict
{
    let confDict:ConfigDict = {};
    // 加载文件
    let files:string[] = fs.readdirSync(root + "/messages");
    for(let fileName of files)
    {
        // 将所有文件中的配置整合到一起
        let str:string = fs.readFileSync(root + "/messages/" + fileName, "utf-8");
        let tempConfDict:TempConfigDict = JSON.parse(str);
        for(let field in tempConfDict)
        {
            let tempConf:TempConfig = tempConfDict[field];
            let confs:Config[] = confDict[field];
            if(!confs) confDict[field] = confs = [];
            // 遍历所有extra，每个extra生成一个Config对象
            for(let exConf of tempConf.extra)
            {
                // 首先用default初始化一个Config
                var temp:any = {fields: []};
                var conf:Config = copyConfig(tempConf.default, temp);
                // 再用exConf中的字段覆盖之
                conf = copyConfig(exConf, conf);
                // 推入conf数组
                confs.push(conf);
            }
        }
    }
    // 如果conf内容中间有->符号，则表示要使用配置中的某项替换
    var regConf:RegExp = /^([a-zA-Z0-9_]+)\->([a-zA-Z0-9_]+)$/;
    for(let field in confDict)
    {
        let confs:Config[] = confDict[field];
        for(let conf of confs)
        {
            for(let key in conf)
            {
                let value:any = conf[key];
                if(typeof value == "string")
                {
                    // 替换值里的表达式
                    ares.bind(conf, new ares_template.TemplateCompiler(value, (text:string)=>{
                        value = text;
                    }));
                    // 检查值
                    let res:RegExpExecArray = regConf.exec(value);
                    if(res)
                    {
                        // 需要替换引用
                        let tempConfs:Config[] = confDict[res[1]];
                        for(let tempConf of tempConfs)
                        {
                            if(tempConf.name == res[2])
                            {
                                conf[key] = tempConf;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    return confDict;
}

function copyConfig(tarConfig:Config, oriConfig?:Config):Config
{
    if(!oriConfig) oriConfig = {} as any;
    for(let key in tarConfig)
    {
        if(key == "fields")
        {
            // 覆盖fields属性
            for(let field of tarConfig.fields)
            {
                if(!oriConfig.fields) oriConfig.fields = [];
                oriConfig.fields.push(field);
            }
        }
        else
        {
            // 覆盖其他属性
            oriConfig[key] = tarConfig[key];
        }
    }
    return oriConfig;
}

export interface ConfigDict
{
    /** field是自由控制的 */
    [field:string]:Config[];
}

export interface Config
{
    /** name属性是特殊的 */
    name:string;
    /** fields属性是特殊的 */
    fields:ConfigField[];
}

export interface ConfigField
{
    /** field名称 */
    name:string;
    /** field类型 */
    type:any;
}

interface TempConfigDict
{
    [field:string]:TempConfig;
}

interface TempConfig
{
    default:Config;
    extra:Config[];
}