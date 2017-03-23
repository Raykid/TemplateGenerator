/// <reference path="message/IndexMessage.ts"/>
/// <reference path="message/DayIndexMessage.ts"/>
/// <reference path="message/WeekIndexMessage.ts"/>
/// <reference path="message/GetQuizsMessage.ts"/>
/// <reference path="message/SubmitResultMessage.ts"/>
/// <reference path="message/GiftIndexMessage.ts"/>
/// <reference path="message/GetGiftMessage.ts"/>
/// <reference path="message/GetProvinceRankMessage.ts"/>
/// <reference path="message/GetSchoolRankMessage.ts"/>
/// <reference path="message/GetNationRankMessage.ts"/>
/// <reference path="message/MonthIndexMessage.ts"/>

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
			dict["Index"] = net.messages.IndexCommand;
			dict["DayIndex"] = net.messages.DayIndexCommand;
			dict["WeekIndex"] = net.messages.WeekIndexCommand;
			dict["GetQuizs"] = net.messages.GetQuizsCommand;
			dict["SubmitResult"] = net.messages.SubmitResultCommand;
			dict["GiftIndex"] = net.messages.GiftIndexCommand;
			dict["GetGift"] = net.messages.GetGiftCommand;
			dict["GetProvinceRank"] = net.messages.GetProvinceRankCommand;
			dict["GetSchoolRank"] = net.messages.GetSchoolRankCommand;
			dict["GetNationRank"] = net.messages.GetNationRankCommand;
			dict["MonthIndex"] = net.messages.MonthIndexCommand;
			return dict;
		}
		
		/**
		 * 竞赛首页
		 */
		public static Index:string = "Index";
		/**
		 * 资格赛首页
		 */
		public static DayIndex:string = "DayIndex";
		/**
		 * 排位赛首页
		 */
		public static WeekIndex:string = "WeekIndex";
		/**
		 * 获取题目接口
		 */
		public static GetQuizs:string = "GetQuizs";
		/**
		 * 答题接口
		 */
		public static SubmitResult:string = "SubmitResult";
		/**
		 * 竞赛礼包领取页面
		 */
		public static GiftIndex:string = "GiftIndex";
		/**
		 * 竞赛礼包领取
		 */
		public static GetGift:string = "GetGift";
		/**
		 * 排行榜资格赛省榜单信息
		 */
		public static GetProvinceRank:string = "GetProvinceRank";
		/**
		 * 排行榜资格赛校榜单信息
		 */
		public static GetSchoolRank:string = "GetSchoolRank";
		/**
		 * 学生获取排行全国榜榜单信息
		 */
		public static GetNationRank:string = "GetNationRank";
		/**
		 * 月总决赛首页
		 */
		public static MonthIndex:string = "MonthIndex";
	}
	
    interface BaseRequestCommandClass
    {
        new ():vox.net.BaseRequestCommand;
    }
}