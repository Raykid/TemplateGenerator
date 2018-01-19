/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 这个文件仅用来快捷引用所有用到的消息体文件，可以不用该文件
*/
$a-{for: msg in message}
import * as $a-{msg.name}Request from "./request/$a-{msg.name}Request";
$a-{end for}