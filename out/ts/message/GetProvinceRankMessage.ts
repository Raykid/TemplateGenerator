/// <reference path="../response/GetProvinceRankResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import GetProvinceRankResponse = net.response.GetProvinceRankResponse;
	
	/**
	 * GetProvinceRank消息体
	 * 排行榜资格赛省榜单信息
	 */
	export class GetProvinceRankMessage extends vox.net.BaseRequestMessage
	{
		/** 取榜单第几页的数据(从0开始计算,0表示第一页) */
        public pageIndex:number;

		/** 每页的数据量(现在默认是一页是10条,建议一页不超过20条,如果超过请和后端同学沟通,数据量大小影响后台性能) */
        public pageSize:number;

		public constructor()
		{
			super(MessageType.GetProvinceRank);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/province/rank/index.vpage");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * GetProvinceRank命令体
	 * 排行榜资格赛省榜单信息
	 */
	export class GetProvinceRankCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:GetProvinceRankMessage = this.getMessage() as GetProvinceRankMessage;
			msg.__data = {
				pageIndex: msg.pageIndex,// number - 取榜单第几页的数据(从0开始计算,0表示第一页)
				pageSize: msg.pageSize// number - 每页的数据量(现在默认是一页是10条,建议一页不超过20条,如果超过请和后端同学沟通,数据量大小影响后台性能)
			};
			super.exec();
		}
		
		public parseResponse(result:any):GetProvinceRankResponse
		{
            var response:GetProvinceRankResponse = new GetProvinceRankResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}