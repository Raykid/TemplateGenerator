/// <reference path="../response/ListContentTypeResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import ListContentTypeResponse = net.response.ListContentTypeResponse;
	
	/**
	 * ListContentType消息体
	 * 字词英雄板块列表
	 */
	export class ListContentTypeMessage extends vox.net.BaseRequestMessage
	{
		/** 级别: 初级:junior; 中级:middle; 高级: senior */
        public difficulty:string;

		public constructor()
		{
			super(MessageType.ListContentType);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/Pass/contentTypeList");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * ListContentType命令体
	 * 字词英雄板块列表
	 */
	export class ListContentTypeCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:ListContentTypeMessage = this.getMessage() as ListContentTypeMessage;
			msg.__data = {
				difficulty: msg.difficulty// string - 级别: 初级:junior; 中级:middle; 高级: senior
			};
			super.exec();
		}
		
		public parseResponse(result:any):ListContentTypeResponse
		{
            var response:ListContentTypeResponse = new ListContentTypeResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}