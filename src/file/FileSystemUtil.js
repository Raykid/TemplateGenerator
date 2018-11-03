"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/21.
 */
var fs = require("fs");
var path = require("path");
function deleteFolder(url, delSelf) {
    try {
        //判断给定的路径是否存在
        var exists = fs.existsSync(url);
        if (exists) {
            //返回文件和子目录的数组
            var files = fs.readdirSync(url);
            files.forEach(function (file) {
                var curPath = path.join(url, file);
                if (fs.statSync(curPath).isDirectory())
                    //fs.statSync同步读取文件夹文件，如果是文件夹，递归调用函数
                    deleteFolder(curPath, true);
                else
                    // 是文件delete file
                    fs.unlinkSync(curPath);
            });
            //清除文件夹
            if (delSelf)
                fs.rmdirSync(url);
        }
        return exists;
    }
    catch (err) {
        // 可能会失败，如果失败了则重试一次
        console.warn("\u5220\u9664\u6587\u4EF6\u5939" + url + "\u5931\u8D25\uFF0C\u91CD\u8BD5\u4E00\u6B21");
        return deleteFolder(url, delSelf);
    }
}
function mkdirs(url) {
    try {
        if (fs.existsSync(url)) {
            return true;
        }
        else {
            if (mkdirs(path.dirname(url))) {
                fs.mkdirSync(url);
                return true;
            }
        }
        return false;
    }
    catch (err) {
        // 可能会失败，如果失败了则重试一次
        console.warn("\u91CD\u5EFA\u6587\u4EF6\u5939" + url + "\u5931\u8D25\uFF0C\u91CD\u8BD5\u4E00\u6B21");
        return mkdirs(url);
    }
}
function emptyFolder(url) {
    try {
        if (!deleteFolder(url, false))
            mkdirs(url);
        // 汇报成功
        console.log("\u6E05\u7A7A\u6587\u4EF6\u5939" + url + "\u6210\u529F");
    }
    catch (err) {
        // 可能会失败，如果失败了则重试一次
        console.warn("\u6E05\u7A7A\u6587\u4EF6\u5939" + url + "\u5931\u8D25\uFF0C1s\u540E\u91CD\u8BD5\u4E00\u6B21");
        setTimeout(emptyFolder, 1000, url);
    }
}
exports.emptyFolder = emptyFolder;
function saveFile(base, lang, name, content) {
    var url = path.join(base, lang, name);
    mkdirs(path.dirname(url));
    fs.writeFileSync(url, content);
}
exports.saveFile = saveFile;
