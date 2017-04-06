/// <reference path="../response/CompetitionAskSessionResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import CompetitionAskSessionResponse = net.response.CompetitionAskSessionResponse;
	
	/**
	 * CompetitionAskSession消息体
	 * 开始竞技
	 */
	export class CompetitionAskSessionMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.CompetitionAskSession);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/competition/askSession");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * CompetitionAskSession命令体
	 * 开始竞技
	 */
	export class CompetitionAskSessionCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:CompetitionAskSessionMessage = this.getMessage() as CompetitionAskSessionMessage;
			msg.__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):CompetitionAskSessionResponse
		{
            var response:CompetitionAskSessionResponse = new CompetitionAskSessionResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}