/// <reference path="../response/SubmitResultResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.messages
{
    import SubmitResultResponse = net.response.SubmitResultResponse;
	
	/**
	 * SubmitResult消息体
	 * 答题接口
	 */
	export class SubmitResultMessage extends vox.net.BaseRequestMessage
	{
		/** DayCompetition, //资格赛 WeekCompetition, //周排位赛 MonthCompetition, //月排位赛 */
        public competitionType:string;

		/** 竞赛id，再次取题目需要有此参数，（第一次获取题目时返回） */
        public competitionId:string;

		/** 答题结果 */
        public result:string;

		/** 第几道题（开始是第1道） */
        public questionNum:number;

		public constructor()
		{
			super(MessageType.SubmitResult);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/studentMobile/competition/processresult.vpage");
		}
		
		public __useGet(): Boolean
		{
			return false;
		}
	}
	
	/**
	 * SubmitResult命令体
	 * 答题接口
	 */
	export class SubmitResultCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			this.getMessage().__data = {
				competitionType: msg.competitionType,// string - DayCompetition, //资格赛 WeekCompetition, //周排位赛 MonthCompetition, //月排位赛
				competitionId: msg.competitionId,// string - 竞赛id，再次取题目需要有此参数，（第一次获取题目时返回）
				result: msg.result,// string - 答题结果
				questionNum: msg.questionNum// number - 第几道题（开始是第1道）
			};
			super.exec();
		}
		
		public parseResponse(result:any):SubmitResultResponse
		{
            var response:SubmitResultResponse = new SubmitResultResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}