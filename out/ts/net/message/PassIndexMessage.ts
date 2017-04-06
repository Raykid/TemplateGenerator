/// <reference path="../response/PassIndexResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import PassIndexResponse = net.response.PassIndexResponse;
	
	/**
	 * PassIndex消息体
	 * 字词英雄闯关首页
	 */
	export class PassIndexMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.PassIndex);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/Pass/index");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * PassIndex命令体
	 * 字词英雄闯关首页
	 */
	export class PassIndexCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:PassIndexMessage = this.getMessage() as PassIndexMessage;
			msg.__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):PassIndexResponse
		{
            var response:PassIndexResponse = new PassIndexResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}