/// <reference path="../response/CompetitionIndexResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import CompetitionIndexResponse = net.response.CompetitionIndexResponse;
	
	/**
	 * CompetitionIndex消息体
	 * 竞技场首页
	 */
	export class CompetitionIndexMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.CompetitionIndex);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/competition/index");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * CompetitionIndex命令体
	 * 竞技场首页
	 */
	export class CompetitionIndexCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:CompetitionIndexMessage = this.getMessage() as CompetitionIndexMessage;
			msg.__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):CompetitionIndexResponse
		{
            var response:CompetitionIndexResponse = new CompetitionIndexResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}