/// <reference path="../$a-{response.field}/$a-{response.name}Response.ts"/>
$a-{for: name in getCustomNames(fields)}
/// <reference path="../$a-{field}/$a-{name}.ts"/>
$a-{end for}

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import $a-{response.name}Response = net.$a-{response.field}.$a-{response.name}Response;
    $a-{for: name in getCustomNames(fields)}
    import $a-{name} = net.$a-{field}.$a-{name};
    $a-{end for}
	
	/**
	 * $a-{name}消息体
	 * $a-{comment}
	 */
	export class $a-{name}Message extends vox.net.BaseRequestMessage
	{
		$a-{for: field in fields}
		/** $a-{field.comment} */
		$a-{if: field.type.class == "basic"}
        public $a-{field.name}:$a-{field.type.to};
        $a-{end if}
		$a-{if: field.type.class == "custom"}
        public $a-{field.name}:$a-{field.type.to} = new $a-{field.type.to}();
        $a-{end if}
        $a-{if: field.type.class == "array"}
        public $a-{field.name}:$a-{field.type.to} = [];
        $a-{end if}
        $a-{if: field.type.class == "map"}
        public $a-{field.name}:$a-{field.type.to} = {};
        $a-{end if}

		$a-{end for}
		public constructor()
		{
			super(MessageType.$a-{name});
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[$a-{domainIndex}] || config.domain) + "$a-{url}");
		}
		
		public __useGet(): Boolean
		{
			return $a-{method == "GET"};
		}
	}
	
	/**
	 * $a-{name}命令体
	 * $a-{comment}
	 */
	export class $a-{name}Command extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:$a-{name}Message = this.getMessage() as $a-{name}Message;
			msg.__data = {
				$a-{for: field in fields}
				$a-{field.name}: msg.$a-{field.name}$a-{if: $index < fields.length - 1},$a-{end if}// $a-{field.type.to} - $a-{field.comment}
				$a-{end for}
			};
			super.exec();
		}
		
		public parseResponse(result:any):$a-{response.name}Response
		{
            var response:$a-{response.name}Response = new $a-{response.name}Response();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}