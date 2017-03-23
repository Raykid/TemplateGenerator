/// <reference path="../response/WeekIndexResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import WeekIndexResponse = net.response.WeekIndexResponse;
	
	/**
	 * WeekIndex消息体
	 * 排位赛首页
	 */
	export class WeekIndexMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.WeekIndex);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/week/competition/index.vpage");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * WeekIndex命令体
	 * 排位赛首页
	 */
	export class WeekIndexCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			this.getMessage().__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):WeekIndexResponse
		{
            var response:WeekIndexResponse = new WeekIndexResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}