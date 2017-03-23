/**
 * Created by Raykid on 2017/3/21.
 */
import * as fs from "fs";
import * as path from "path";

function deleteFolder(url:string, delSelf:boolean):boolean
{
    try
    {
        //判断给定的路径是否存在
        var exists:boolean = fs.existsSync(url);
        if(exists)
        {
            //返回文件和子目录的数组
            var files:string[] = fs.readdirSync(url);
            files.forEach((file:string)=>{
                var curPath:string = path.join(url, file);
                if(fs.statSync(curPath).isDirectory())
                //fs.statSync同步读取文件夹文件，如果是文件夹，递归调用函数
                    deleteFolder(curPath, true);
                else
                // 是文件delete file
                    fs.unlinkSync(curPath);
            });
            //清除文件夹
            if(delSelf) fs.rmdirSync(url);
        }
        return exists;
    }
    catch(err)
    {
        // 可能会失败，如果失败了则重试一次
        console.warn(`删除文件夹${url}失败，重试一次`);
        return deleteFolder(url, delSelf);
    }
}

function mkdirs(url:string):boolean
{
    try
    {
        if(fs.existsSync(url))
        {
            return true;
        }
        else
        {
            if(mkdirs(path.dirname(url)))
            {
                fs.mkdirSync(url);
                return true;
            }
        }
        return false;
    }
    catch(err)
    {
        // 可能会失败，如果失败了则重试一次
        console.warn(`重建文件夹${url}失败，重试一次`);
        return mkdirs(url);
    }
}

export function emptyFolder(url:string):void
{
    try
    {
        if(!deleteFolder(url, false)) mkdirs(url);
        // 汇报成功
        console.log(`清空文件夹${url}成功`)
    }
    catch(err)
    {
        // 可能会失败，如果失败了则重试一次
        console.warn(`清空文件夹${url}失败，1s后重试一次`);
        setTimeout(emptyFolder, 1000, url);
    }
}

export function saveFile(base:string, lang:string, name:string, content:string):void
{
    var url:string = path.join(base, lang, name);
    mkdirs(path.dirname(url));
    fs.writeFileSync(url, content);
}