/// <reference path="../response/MonthIndexResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import MonthIndexResponse = net.response.MonthIndexResponse;
	
	/**
	 * MonthIndex消息体
	 * 月总决赛首页
	 */
	export class MonthIndexMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.MonthIndex);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/month/competition/index.vpage");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * MonthIndex命令体
	 * 月总决赛首页
	 */
	export class MonthIndexCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:MonthIndexMessage = this.getMessage() as MonthIndexMessage;
			msg.__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):MonthIndexResponse
		{
            var response:MonthIndexResponse = new MonthIndexResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}