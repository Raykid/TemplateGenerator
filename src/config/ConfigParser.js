"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/17.
 */
var fs = require("fs");
var ares = require("../../libs/ares.js");
var ares_template = require("../../libs/ares_template.js");
function parserConfig(root) {
    var confDict = {};
    // 加载文件
    var files = fs.readdirSync(root + "/messages");
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var fileName = files_1[_i];
        // 将所有文件中的配置整合到一起
        var str = fs.readFileSync(root + "/messages/" + fileName, "utf-8");
        var tempConfDict = JSON.parse(str);
        for (var field in tempConfDict) {
            var tempConf = tempConfDict[field];
            var confs = confDict[field];
            if (!confs)
                confDict[field] = confs = [];
            // 遍历所有extra，每个extra生成一个Config对象
            for (var _a = 0, _b = tempConf.extra; _a < _b.length; _a++) {
                var exConf = _b[_a];
                // 首先用default初始化一个Config
                var temp = { fields: [] };
                var conf = copyConfig(tempConf.default, temp);
                // 再用exConf中的字段覆盖之
                conf = copyConfig(exConf, conf);
                // 推入conf数组
                confs.push(conf);
            }
        }
    }
    // 如果conf内容中间有->符号，则表示要使用配置中的某项替换
    var regConf = /^([a-zA-Z0-9_]+)\->([a-zA-Z0-9_]+)$/;
    for (var field in confDict) {
        var confs = confDict[field];
        for (var _c = 0, confs_1 = confs; _c < confs_1.length; _c++) {
            var conf_1 = confs_1[_c];
            var _loop_1 = function (key) {
                var value = conf_1[key];
                if (typeof value == "string") {
                    // 替换值里的表达式
                    ares.bind(conf_1, new ares_template.TemplateCompiler(value, function (text) {
                        value = text;
                    }));
                    // 检查值
                    var res = regConf.exec(value);
                    if (res) {
                        // 需要替换引用
                        var tempConfs = confDict[res[1]];
                        for (var _i = 0, tempConfs_1 = tempConfs; _i < tempConfs_1.length; _i++) {
                            var tempConf = tempConfs_1[_i];
                            if (tempConf.name == res[2]) {
                                conf_1[key] = tempConf;
                                break;
                            }
                        }
                    }
                }
            };
            for (var key in conf_1) {
                _loop_1(key);
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
//# sourceMappingURL=ConfigParser.js.map