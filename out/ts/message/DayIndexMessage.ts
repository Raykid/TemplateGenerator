/// <reference path="../response/DayIndexResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import DayIndexResponse = net.response.DayIndexResponse;
	
	/**
	 * DayIndex消息体
	 * 资格赛首页
	 */
	export class DayIndexMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.DayIndex);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/day/competition/index.vpage");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * DayIndex命令体
	 * 资格赛首页
	 */
	export class DayIndexCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:DayIndexMessage = this.getMessage() as DayIndexMessage;
			msg.__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):DayIndexResponse
		{
            var response:DayIndexResponse = new DayIndexResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}