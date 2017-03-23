/// <reference path="../response/GetQuizsResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import GetQuizsResponse = net.response.GetQuizsResponse;
	
	/**
	 * GetQuizs消息体
	 * 获取题目接口
	 */
	export class GetQuizsMessage extends vox.net.BaseRequestMessage
	{
		/** DayCompetition, //资格赛 WeekCompetition, //周排位赛 MonthCompetition, //月排位赛 */
        public competitionType:string;

		/** 竞赛id，再次取题目需要有此参数，（第一次获取题目时返回） */
        public competitionId:string;

		public constructor()
		{
			super(MessageType.GetQuizs);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/questions.vpage");
		}
		
		public __useGet(): Boolean
		{
			return false;
		}
	}
	
	/**
	 * GetQuizs命令体
	 * 获取题目接口
	 */
	export class GetQuizsCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:GetQuizsMessage = this.getMessage() as GetQuizsMessage;
			msg.__data = {
				competitionType: msg.competitionType,// string - DayCompetition, //资格赛 WeekCompetition, //周排位赛 MonthCompetition, //月排位赛
				competitionId: msg.competitionId// string - 竞赛id，再次取题目需要有此参数，（第一次获取题目时返回）
			};
			super.exec();
		}
		
		public parseResponse(result:any):GetQuizsResponse
		{
            var response:GetQuizsResponse = new GetQuizsResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}