/// <reference path="../response/GetSchoolRankResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import GetSchoolRankResponse = net.response.GetSchoolRankResponse;
	
	/**
	 * GetSchoolRank消息体
	 * 排行榜资格赛校榜单信息
	 */
	export class GetSchoolRankMessage extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.GetSchoolRank);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/school/rank/index.vpage");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * GetSchoolRank命令体
	 * 排行榜资格赛校榜单信息
	 */
	export class GetSchoolRankCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			this.getMessage().__data = {
			};
			super.exec();
		}
		
		public parseResponse(result:any):GetSchoolRankResponse
		{
            var response:GetSchoolRankResponse = new GetSchoolRankResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}