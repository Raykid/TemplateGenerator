/**
 * Created by Raykid on 2017/3/20.
 */
import langParser = require("../lang/LangParser");
import configParser = require("../config/ConfigParser");
var ares = require("../../libs/ares.js");
var ares_template = require("../../libs/ares_template.js");

export function replaceTemplate(
    typeDict:langParser.LangType[],
    template:langParser.LangTemplate,
    conf:{[key:string]:any}):TemplateResult
{
    // 复制一份conf，将其中的类型改了
    let newConf:any = {};
    for(let key in conf)
    {
        var value:any = conf[key];
        if(key == "fields")
        {
            // 需要将fields里面的所有类型进行一次转换
            value = value.map(field=>{
                let newField:any = {};
                for(let key in field)
                {
                    newField[key] = field[key];
                }
                // 特别处理type属性
                newField.oriType = newField.type;
                newField.type = transformType(newField.type);
                return newField;
            }, this);
        }
        newConf[key] = value;
    }
    // 添加一些工具方法
    newConf.getCustomNames = getCustomNames;
    newConf.removeDuplicate = removeDuplicate;
    newConf.transformType = transformType;
    // 准备结果
    let res:TemplateResult = {
        saveName: null,
        content: null
    };
    // 替换文件名
    ares.bind(newConf, new ares_template.TemplateCompiler(template.saveName, (text:string)=>{
        res.saveName = text;
    }));
    // 替换内容
    ares.bind(newConf, new ares_template.TemplateCompiler(template.file, (text:string)=>{
        res.content = text;
    }));
    // 返回结果
    return res;

    /**************** 下面是工具方法 ****************/
    function getCustomNames(fields:configParser.ConfigField[]):string[]
    {
        let customNames:string[] = [];
        for(let field of fields)
        {
            customNames = customNames.concat(field.type.customNames);
        }
        return removeDuplicate(customNames);
    }

    function removeDuplicate<T>(list:T[]):T[]
    {
        let tempList:T[] = [];
        for(var i:number = 0, len:number = list.length; i < len; i++)
        {
            let item:T = list[i];
            if(tempList.indexOf(item) >= 0)
            {
                list.splice(i, 1);
                i --;
                len --;
            }
            tempList.push(item);
        }
        return list;
    }

    function transformType(type:string):langParser.LangType
    {
        for(let conf of typeDict)
        {
            if(conf.from == type)
            {
                return conf;
            }
            else if(conf.from instanceof RegExp)
            {
                var res:RegExpExecArray = conf.from.exec(type);
                if(res)
                {
                    let customNames:string[] = [];
                    let tempStrs:string[] = [];
                    let tempStr:string = res[0];
                    // 将整个段落的前面部分推入数组
                    tempStrs.push(type.substring(0, res.index));
                    for(var i:number = 1, len:number = res.length; i < len; i++)
                    {
                        let before:string = res[i];
                        var subType:langParser.LangType = transformType(before);
                        let after:string = subType.to;
                        let index:number = tempStr.indexOf(before);
                        let count:number = before.length;
                        // 将before前面的部分推入数组
                        tempStrs.push(tempStr.substring(0, index));
                        // 将after推入数组
                        tempStrs.push(after);
                        // 截断tempStr
                        tempStr = tempStr.substr(index + count);
                        // 连接customNames
                        customNames = customNames.concat(subType.customNames);
                    }
                    // 将customNames做一次去重
                    customNames = removeDuplicate(customNames);
                    // 将tempStr剩余部分推入数组
                    tempStrs.push(tempStr);
                    // 将整个段落的后面部分推入数组
                    tempStrs.push(type.substr(res.index + res[0].length));
                    // 使用连接起来的字符串进行替换
                    let newType:string = tempStrs.join("");
                    return {
                        from: type,
                        to: newType.replace(conf.from, conf.to),
                        class: conf.class,
                        customNames: customNames
                    };
                }
            }
        }
        // 返回未知类型
        return {
            from: type,
            to: type,
            class: "custom",
            customNames: [type]
        };
    }
}

export interface TemplateResult
{
    /** 替换后的保存文件名 */
    saveName:string;
    /** 替换后的文件内容 */
    content:string;
}