/// <reference path="message/IndexMessage.ts"/>
/// <reference path="message/PassIndexMessage.ts"/>
/// <reference path="message/ListContentTypeMessage.ts"/>
/// <reference path="message/ListPassMessage.ts"/>
/// <reference path="message/StartSessionMessage.ts"/>
/// <reference path="message/AnswerSessionMessage.ts"/>
/// <reference path="message/CompetitionIndexMessage.ts"/>
/// <reference path="message/CompetitionAskSessionMessage.ts"/>
/// <reference path="message/CompetitionReplySessionMessage.ts"/>
/// <reference path="message/CompetitionPkHistoryMessage.ts"/>

/**
 * Created by TemplateGenerator.
 */
namespace net
{
	export class MessageType
	{
		/** 获取命令字典 */
		public static commandDict():{[name:string]:BaseRequestCommandClass}
		{
			var dict:{[name:string]:BaseRequestCommandClass} = {};
			dict["Index"] = net.message.IndexCommand;
			dict["PassIndex"] = net.message.PassIndexCommand;
			dict["ListContentType"] = net.message.ListContentTypeCommand;
			dict["ListPass"] = net.message.ListPassCommand;
			dict["StartSession"] = net.message.StartSessionCommand;
			dict["AnswerSession"] = net.message.AnswerSessionCommand;
			dict["CompetitionIndex"] = net.message.CompetitionIndexCommand;
			dict["CompetitionAskSession"] = net.message.CompetitionAskSessionCommand;
			dict["CompetitionReplySession"] = net.message.CompetitionReplySessionCommand;
			dict["CompetitionPkHistory"] = net.message.CompetitionPkHistoryCommand;
			return dict;
		}
		
		/**
		 * 首页
		 */
		public static Index:string = "Index";
		/**
		 * 字词英雄闯关首页
		 */
		public static PassIndex:string = "PassIndex";
		/**
		 * 字词英雄板块列表
		 */
		public static ListContentType:string = "ListContentType";
		/**
		 * 字词英雄关卡列表
		 */
		public static ListPass:string = "ListPass";
		/**
		 * 开始闯关
		 */
		public static StartSession:string = "StartSession";
		/**
		 * 闯关答题
		 */
		public static AnswerSession:string = "AnswerSession";
		/**
		 * 竞技场首页
		 */
		public static CompetitionIndex:string = "CompetitionIndex";
		/**
		 * 开始竞技
		 */
		public static CompetitionAskSession:string = "CompetitionAskSession";
		/**
		 * 竞技场答题
		 */
		public static CompetitionReplySession:string = "CompetitionReplySession";
		/**
		 * 查看我的战绩
		 */
		public static CompetitionPkHistory:string = "CompetitionPkHistory";
	}
	
    interface BaseRequestCommandClass
    {
        new ():vox.net.BaseRequestCommand;
    }
}