/// <reference path="../response/AnswerSessionResponse.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net.message
{
    import AnswerSessionResponse = net.response.AnswerSessionResponse;
	
	/**
	 * AnswerSession消息体
	 * 闯关答题
	 */
	export class AnswerSessionMessage extends vox.net.BaseRequestMessage
	{
		/** 闯关会话ID */
        public session_id:string;

		/** 答案列表{"q1":{"is_right":true,"cost_time":1500},"q2":{"is_right":true,"cost_time":1500}} */
        public answer_list:string;

		public constructor()
		{
			super(MessageType.AnswerSession);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/Pass/answerSession");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
	
	/**
	 * AnswerSession命令体
	 * 闯关答题
	 */
	export class AnswerSessionCommand extends vox.net.BaseRequestCommand
	{
		public exec():void
		{
			var msg:AnswerSessionMessage = this.getMessage() as AnswerSessionMessage;
			msg.__data = {
				session_id: msg.session_id,// string - 闯关会话ID
				answer_list: msg.answer_list// string - 答案列表{"q1":{"is_right":true,"cost_time":1500},"q2":{"is_right":true,"cost_time":1500}}
			};
			super.exec();
		}
		
		public parseResponse(result:any):AnswerSessionResponse
		{
            var response:AnswerSessionResponse = new AnswerSessionResponse();
			response.success = result["success"];
            response.parse(result);
			return response;
		}
	}
}