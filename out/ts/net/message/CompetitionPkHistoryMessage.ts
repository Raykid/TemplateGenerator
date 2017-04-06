/// <reference path="../response/CompetitionPkHistoryResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import CompetitionPkHistoryResponse = net.response.CompetitionPkHistoryResponse;
	
	/**
	 * CompetitionPkHistory消息体
	 * 查看我的战绩
	 */
	export class CompetitionPkHistoryMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.CompetitionPkHistory);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/competition/getPkHistory");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * CompetitionPkHistory命令体
	 * 查看我的战绩
	 */
	export class CompetitionPkHistoryCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:CompetitionPkHistoryMessage = this.getMessage() as CompetitionPkHistoryMessage;
			msg.__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):CompetitionPkHistoryResponse
		{
            var response:CompetitionPkHistoryResponse = new CompetitionPkHistoryResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}