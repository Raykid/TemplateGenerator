/// <reference path="../response/CompetitionReplySessionResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import CompetitionReplySessionResponse = net.response.CompetitionReplySessionResponse;
	
	/**
	 * CompetitionReplySession消息体
	 * 竞技场答题
	 */
	export class CompetitionReplySessionMessage extends vox.net.BaseRequestMessage
	{
		/** 竞技场会话ID */
        public session_id:string;

		/** 题号 */
        public question_num:string;

		/** 答案 */
        public answer:string;

		/** 答题时间 */
        public cost_time:string;

		public constructor()
		{
			super(MessageType.CompetitionReplySession);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/competition/replySession");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * CompetitionReplySession命令体
	 * 竞技场答题
	 */
	export class CompetitionReplySessionCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:CompetitionReplySessionMessage = this.getMessage() as CompetitionReplySessionMessage;
			msg.__data = {
				session_id: msg.session_id,// string - 竞技场会话ID
				question_num: msg.question_num,// string - 题号
				answer: msg.answer,// string - 答案
				cost_time: msg.cost_time// string - 答题时间
			};
			super.exec();
		}
		
		public parseResponse(result:any):CompetitionReplySessionResponse
		{
            var response:CompetitionReplySessionResponse = new CompetitionReplySessionResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}