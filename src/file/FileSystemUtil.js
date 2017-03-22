"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2017/3/21.
 */
const fs = require("fs");
const path = require("path");
function deleteFolder(url, delSelf) {
    //判断给定的路径是否存在
    var exists = fs.existsSync(url);
    if (exists) {
        //返回文件和子目录的数组
        var files = fs.readdirSync(url);
        files.forEach((file) => {
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
function mkdirs(url) {
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
function emptyFolder(url) {
    if (!deleteFolder(url, false))
        mkdirs(url);
}
exports.emptyFolder = emptyFolder;
function saveFile(base, lang, name, content) {
    var url = path.join(base, lang, name);
    mkdirs(path.dirname(url));
    fs.writeFileSync(url, content);
}
exports.saveFile = saveFile;
//# sourceMappingURL=FileSystemUtil.js.map