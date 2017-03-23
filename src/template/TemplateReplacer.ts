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
    newConf.getCustomTypes = getCustomTypes;
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
    ares.bind(newConf, new ares_template.TemplateCompiler(template.content, (text:string)=>{
        res.content = text;
    }));
    // 返回结果
    return res;

    /**************** 下面是工具方法 ****************/
    function getCustomTypes(fields:configParser.ConfigField[]):langParser.LangType[]
    {
        let customTypes:langParser.LangType[] = [];
        for(let field of fields)
        {
            customTypes = customTypes.concat(field.type.customTypes);
        }
        return removeDuplicate(customTypes, equals);
    }

    function equals(a:langParser.LangType, b:langParser.LangType):boolean
    {
        return (a.to == b.to);
    }

    function removeDuplicate<T>(list:T[], equals?:(a:T, b:T)=>boolean):T[]
    {
        let tempList:T[] = [];
        for(let i:number = 0, lenI:number = list.length; i < lenI; i++)
        {
            let item:T = list[i];
            for(let j:number = 0, lenJ:number = tempList.length; j < lenJ; j++)
            {
                let tempItem:T = tempList[j];
                if((equals != null && equals(item, tempItem)) || item == tempItem)
                {
                    list.splice(i, 1);
                    i --;
                    lenI --;
                }
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
                    let customTypes:langParser.LangType[] = [];
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
                        // 连接customTypes
                        customTypes = customTypes.concat(subType.customTypes);
                        // 如果subType是customType则将其推入数组
                        if(subType.class == "custom") customTypes.push(subType);
                    }
                    // 将customTypes做一次去重
                    customTypes = removeDuplicate(customTypes, equals);
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
                        customTypes: customTypes
                    };
                }
            }
        }
        // 返回未知类型
        return {
            from: type,
            to: type,
            class: "custom",
            customTypes: []
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