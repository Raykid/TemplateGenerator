/// <reference path="../response/IndexResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import IndexResponse = net.response.IndexResponse;
	
	/**
	 * Index消息体
	 * 首页
	 */
	export class IndexMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.Index);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/home/index");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * Index命令体
	 * 首页
	 */
	export class IndexCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:IndexMessage = this.getMessage() as IndexMessage;
			msg.__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):IndexResponse
		{
            var response:IndexResponse = new IndexResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}