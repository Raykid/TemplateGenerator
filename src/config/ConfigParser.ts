/**
 * Created by Raykid on 2017/3/17.
 */
import * as fs from "fs";
import * as xml2js from "xml2js";
var ares = require("../../libs/ares.js");
var ares_template = require("../../libs/ares_template.js");

export function parserConfig(root:string):ConfigDict
{
    let confDict:ConfigDict = {};
    // 加载文件
    let files:string[] = fs.readdirSync(root + "/messages");
    for(let fileName of files)
    {
        let extArr:string[] = fileName.split(".");
        let ext:string = extArr[extArr.length - 1];
        let str:string = fs.readFileSync(root + "/messages/" + fileName, "utf-8");
        let tempConfDict:TempConfigDict;
        let doConf:()=>void = ()=>
        {
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
                    // 添加所属文件名
                    conf.file = fileName;
                    // 添加所属域名
                    conf.field = field;
                    // 添加默认配置
                    conf.default = tempConf.default;
                    // 添加自主配置
                    conf.extra = exConf;
                    // 推入conf数组
                    confs.push(conf);
                }
            }
            // 日志
            console.log(`读取消息配置[${fileName}]成功`);
        };
        switch(ext)
        {
            case "json":
                // 将所有文件中的配置整合到一起
                tempConfDict = JSON.parse(str);
                doConf();
                break;
            case "xml":
                xml2js.parseString(str, (err:any, result:any)=>
                {
                    tempConfDict = {};
                    for(let field in result.config)
                    {
                        let conf:any = {};
                        let fieldData:any = result.config[field][0];
                        let defaultData:any = fieldData.default[0];
                        let extraDatas:any = fieldData.extra[0].item;
                        // 设置default
                        conf.default = defaultData.$;
                        if(defaultData.field)
                        {
                            if(!conf.default) conf.default = {};
                            conf.default.fields = defaultData.field.map(field=>field.$);
                        }
                        // 设置extra
                        conf.extra = [];
                        for(let extraData of extraDatas)
                        {
                            let tempExtra:any = extraData.$;
                            if(extraData.field)
                            {
                                tempExtra.fields = extraData.field.map(item=>item.$, this);
                            }
                            conf.extra.push(tempExtra);
                        }
                        // 保存conf
                        tempConfDict[field] = conf;
                    }
                    doConf();
                });
                break;
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
                        let field:string = res[1];
                        let name:string = res[2];
                        let tempConfs:Config[] = confDict[field];
                        let success:boolean = false;
                        for(let tempConf of tempConfs)
                        {
                            if(tempConf.name == name)
                            {
                                conf[key] = tempConf;
                                success = true;
                                break;
                            }
                        }
                        // 如果没有找到引用，则造一个引用
                        if(!success)
                        {
                            let tempConf:Config = {
                                name: name,
                                comment: conf.comment,
                                file: conf.file,
                                field: field,
                                default: null,
                                extra: null,
                                fields: []
                            };
                            conf[key] = tempConf;
                            tempConfs.push(tempConf);
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

export function filterConfigs(configDict:ConfigDict, include?:string[], exclude?:string[]):ConfigDict
{
    var result:ConfigDict = {};
    for(var key in configDict)
    {
        var configs:Config[] = configDict[key];
        result[key] = configs.filter(conf=>{
            // 优先判断白名单
            if(include && include.length > 0)
            {
                // 白名单存在，那么在白名单里就用，不在就不用
                return (include.indexOf(conf.file) >= 0);
            }
            // 然后判断黑名单
            else
            {
                // 在就不用，不在就用
                return (!exclude || exclude.indexOf(conf.file) < 0);
            }
        }, this);
    }
    return result;
}

export interface ConfigDict
{
    /** field是自由控制的 */
    [field:string]:Config[];
}

export interface Config
{
    /** 消息配置名称 */
    name:string;
    /** 消息注释 */
    comment:string;
    /** 所属文件名 */
    file:string;
    /** 消息所属域名 */
    field:string;
    /** 默认配置 */
    default:Config;
    /** 自主配置 */
    extra:Config;
    /** 子域数组 */
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