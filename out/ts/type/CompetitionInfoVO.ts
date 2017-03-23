
namespace net.type
{
	
	/**
	 * 同班同年级获得奖励提示
	 */
	export class CompetitionInfoVO extends vox.net.BaseMessageType
	{
		/** 比赛是否进行中 */
        public turnOn:boolean;

		/** 提示文案 */
        public title:string;

		/** 进行时的参赛人数 */
        public joinNum:number;

		/** 排位赛进行时该字段可能存在,true表示领取排位赛大礼包 */
        public weekCompetitionGift:boolean;

		/** 获得门票人数 */
        public ticketStudentNum:number;

		/** 如果是月赛则要传月份数 */
        public month:number;

		/** 比赛开始时间 */
        public beginTime:number;

		/** 当前时间 */
        public currentTime:number;

		public pack():{[name:string]:any}
		{
			return {
				turnOn: this.turnOn,				
				title: this.title,				
				joinNum: this.joinNum,				
				weekCompetitionGift: this.weekCompetitionGift,				
				ticketStudentNum: this.ticketStudentNum,				
				month: this.month,				
				beginTime: this.beginTime,				
				currentTime: this.currentTime				
			};
		}
		
		public parse(data:any):CompetitionInfoVO
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.turnOn = data.turnOn;
			this.title = data.title;
			this.joinNum = data.joinNum;
			this.weekCompetitionGift = data.weekCompetitionGift;
			this.ticketStudentNum = data.ticketStudentNum;
			this.month = data.month;
			this.beginTime = data.beginTime;
			this.currentTime = data.currentTime;
			return this;
		}
	}
}