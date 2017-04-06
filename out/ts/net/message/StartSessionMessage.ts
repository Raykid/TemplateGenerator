/// <reference path="../response/StartSessionResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import StartSessionResponse = net.response.StartSessionResponse;
	
	/**
	 * StartSession消息体
	 * 开始闯关
	 */
	export class StartSessionMessage extends vox.net.BaseRequestMessage
	{
		/** 级别: 初级:junior; 中级:middle; 高级: senior */
        public difficulty:string;

		/** 板块ID */
        public content_type:number;

		/** 关卡ID */
        public pass_id:number;

		public constructor()
		{
			super(MessageType.StartSession);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/Pass/startSession");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * StartSession命令体
	 * 开始闯关
	 */
	export class StartSessionCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:StartSessionMessage = this.getMessage() as StartSessionMessage;
			msg.__data = {
				difficulty: msg.difficulty,// string - 级别: 初级:junior; 中级:middle; 高级: senior
				content_type: msg.content_type,// number - 板块ID
				pass_id: msg.pass_id// number - 关卡ID
			};
			super.exec();
		}
		
		public parseResponse(result:any):StartSessionResponse
		{
            var response:StartSessionResponse = new StartSessionResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}