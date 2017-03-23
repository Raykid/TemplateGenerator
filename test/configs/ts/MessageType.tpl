$a-{for: msg in message}
/// <reference path="$a-{getConfigByName(msg.name).field}/$a-{msg.name}Message.ts"/>
$a-{end for}

/**
 * Created by TemplateGenerator.
 */
namespace net
{
	export class MessageType
	{
		/** 获取命令字典 */
		public static commandDict():{[name:string]:BaseRequestCommandClass}
		{
			var dict:{[name:string]:BaseRequestCommandClass} = {};
			$a-{for: msg in message}
			dict["$a-{msg.name}"] = net.messages.$a-{msg.name}Command;
			$a-{end for}
			return dict;
		}
		
		$a-{for: msg in message}
		/**
		 * $a-{msg.comment}
		 */
		public static $a-{msg.name}:string = "$a-{msg.name}";
		$a-{end for}
	}
	
    interface BaseRequestCommandClass
    {
        new ():vox.net.BaseRequestCommand;
    }
}