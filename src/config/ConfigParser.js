"use strict";
/// <reference path="../../libs/xml2js/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/17.
 */
var fs = require("fs");
var xml2js = require("xml2js");
var ares = require("../../libs/ares.js");
var ares_template = require("../../libs/ares_template.js");
function parserConfig(root) {
    var _this = this;
    var confDict = {};
    // 加载文件
    var files = fs.readdirSync(root + "/messages");
    var _loop_1 = function (fileName) {
        var extArr = fileName.split(".");
        var ext = extArr[extArr.length - 1];
        var str = fs.readFileSync(root + "/messages/" + fileName, "utf-8");
        var tempConfDict;
        var doConf = function () {
            for (var field in tempConfDict) {
                var tempConf = tempConfDict[field];
                var confs = confDict[field];
                if (!confs)
                    confDict[field] = confs = [];
                // 遍历所有extra，每个extra生成一个Config对象
                for (var _i = 0, _a = tempConf.extra; _i < _a.length; _i++) {
                    var exConf = _a[_i];
                    // 首先用default初始化一个Config
                    var temp = { fields: [] };
                    var conf = copyConfig(tempConf.default, temp);
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
            console.log("\u8BFB\u53D6\u6D88\u606F\u914D\u7F6E[" + fileName + "]\u6210\u529F");
        };
        switch (ext) {
            case "json":
                // 将所有文件中的配置整合到一起
                tempConfDict = JSON.parse(str);
                doConf();
                break;
            case "xml":
                xml2js.parseString(str, function (err, result) {
                    tempConfDict = {};
                    for (var field in result.config) {
                        var conf = {};
                        var fieldData = result.config[field][0];
                        var defaultData = fieldData.default[0];
                        var extraDatas = fieldData.extra[0].item;
                        // 设置default
                        conf.default = defaultData.$;
                        if (defaultData.field) {
                            if (!conf.default)
                                conf.default = {};
                            conf.default.fields = defaultData.field.map(function (field) { return field.$; });
                        }
                        // 设置extra
                        conf.extra = [];
                        for (var _i = 0, extraDatas_1 = extraDatas; _i < extraDatas_1.length; _i++) {
                            var extraData = extraDatas_1[_i];
                            var tempExtra = extraData.$;
                            if (extraData.field) {
                                tempExtra.fields = extraData.field.map(function (item) { return item.$; }, _this);
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
    };
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var fileName = files_1[_i];
        _loop_1(fileName);
    }
    // 如果conf内容中间有->符号，则表示要使用配置中的某项替换
    var regConf = /^([a-zA-Z0-9_]+)\->([a-zA-Z0-9_]+)$/;
    for (var field in confDict) {
        var confs = confDict[field];
        for (var _a = 0, confs_1 = confs; _a < confs_1.length; _a++) {
            var conf = confs_1[_a];
            var _loop_2 = function (key) {
                var value = conf[key];
                if (typeof value == "string") {
                    // 替换值里的表达式
                    ares.bind(conf, new ares_template.TemplateCompiler(value, function (text) {
                        value = text;
                    }));
                    // 检查值
                    var res = regConf.exec(value);
                    if (res) {
                        // 需要替换引用
                        var field_1 = res[1];
                        var name_1 = res[2];
                        var tempConfs = confDict[field_1];
                        var success = false;
                        for (var _i = 0, tempConfs_1 = tempConfs; _i < tempConfs_1.length; _i++) {
                            var tempConf = tempConfs_1[_i];
                            if (tempConf.name == name_1) {
                                conf[key] = tempConf;
                                success = true;
                                break;
                            }
                        }
                        // 如果没有找到引用，则造一个引用
                        if (!success) {
                            var tempConf = {
                                name: name_1,
                                comment: conf.comment,
                                file: conf.file,
                                field: field_1,
                                default: null,
                                extra: null,
                                fields: []
                            };
                            conf[key] = tempConf;
                            tempConfs.push(tempConf);
                        }
                    }
                }
            };
            for (var key in conf) {
                _loop_2(key);
            }
        }
    }
    return confDict;
}
exports.parserConfig = parserConfig;
function copyConfig(tarConfig, oriConfig) {
    if (!oriConfig)
        oriConfig = {};
    for (var key in tarConfig) {
        if (key == "fields") {
            // 覆盖fields属性
            for (var _i = 0, _a = tarConfig.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                if (!oriConfig.fields)
                    oriConfig.fields = [];
                oriConfig.fields.push(field);
            }
        }
        else {
            // 覆盖其他属性
            oriConfig[key] = tarConfig[key];
        }
    }
    return oriConfig;
}
function filterConfigs(configDict, include, exclude) {
    var result = {};
    for (var key in configDict) {
        var configs = configDict[key];
        result[key] = configs.filter(function (conf) {
            // 优先判断白名单
            if (include && include.length > 0) {
                // 白名单存在，那么在白名单里就用，不在就不用
                return (include.indexOf(conf.file) >= 0);
            }
            // 然后判断黑名单
            else {
                // 在就不用，不在就用
                return (!exclude || exclude.indexOf(conf.file) < 0);
            }
        }, this);
    }
    return result;
}
exports.filterConfigs = filterConfigs;
//# sourceMappingURL=ConfigParser.js.map