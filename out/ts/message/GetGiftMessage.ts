/// <reference path="../response/GetGiftResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import GetGiftResponse = net.response.GetGiftResponse;
	
	/**
	 * GetGift消息体
	 * 竞赛礼包领取
	 */
	export class GetGiftMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.GetGift);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/gift/receive.vpage");
		}
		
		public __useGet(): Boolean
		{
			return false;
		}
	}
	
	/**
	 * GetGift命令体
	 * 竞赛礼包领取
	 */
	export class GetGiftCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			this.getMessage().__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):GetGiftResponse
		{
            var response:GetGiftResponse = new GetGiftResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}