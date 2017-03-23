/// <reference path="../response/GiftIndexResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import GiftIndexResponse = net.response.GiftIndexResponse;
	
	/**
	 * GiftIndex消息体
	 * 竞赛礼包领取页面
	 */
	export class GiftIndexMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.GiftIndex);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/gift/index.vpage");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * GiftIndex命令体
	 * 竞赛礼包领取页面
	 */
	export class GiftIndexCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:GiftIndexMessage = this.getMessage() as GiftIndexMessage;
			msg.__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):GiftIndexResponse
		{
            var response:GiftIndexResponse = new GiftIndexResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}