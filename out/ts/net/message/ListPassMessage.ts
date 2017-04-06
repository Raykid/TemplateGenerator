/// <reference path="../response/ListPassResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import ListPassResponse = net.response.ListPassResponse;
	
	/**
	 * ListPass消息体
	 * 字词英雄关卡列表
	 */
	export class ListPassMessage extends vox.net.BaseRequestMessage
	{
		/** 级别: 初级:junior; 中级:middle; 高级: senior */
        public difficulty:string;

		/** 板块ID */
        public content_type:number;

		public constructor()
		{
			super(MessageType.ListPass);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/Pass/passList");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * ListPass命令体
	 * 字词英雄关卡列表
	 */
	export class ListPassCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:ListPassMessage = this.getMessage() as ListPassMessage;
			msg.__data = {
				difficulty: msg.difficulty,// string - 级别: 初级:junior; 中级:middle; 高级: senior
				content_type: msg.content_type// number - 板块ID
			};
			super.exec();
		}
		
		public parseResponse(result:any):ListPassResponse
		{
            var response:ListPassResponse = new ListPassResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}