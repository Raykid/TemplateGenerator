
namespace net.response
{
	
	/**
	 * 排位赛首页
	 */
	export class WeekIndexResponse extends vox.net.BaseMessageType
	{
		/** 是否本周首次点击进入排位赛首页(true表示首次进入) */
        public firstLogin:boolean;

		/** 最高连对题数(字段可能不存在) */
        public questionNum:number;

		/** 最高成绩(可能字段不存在) */
        public grade:number;

		/** 省区排名(字段可能不存在) */
        public provinceRank:number;

		/** 自己周赛的门票数量 */
        public weekTicket:number;

		public pack():{[name:string]:any}
		{
			return {
				firstLogin: this.firstLogin,				
				questionNum: this.questionNum,				
				grade: this.grade,				
				provinceRank: this.provinceRank,				
				weekTicket: this.weekTicket				
			};
		}
		
		public parse(data:any):WeekIndexResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.firstLogin = data.firstLogin;
			this.questionNum = data.questionNum;
			this.grade = data.grade;
			this.provinceRank = data.provinceRank;
			this.weekTicket = data.weekTicket;
			return this;
		}
	}
}