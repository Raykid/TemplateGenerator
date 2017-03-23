
namespace net.response
{
	
	/**
	 * 排位赛首页
	 */
	export class MonthIndexResponse extends vox.net.BaseMessageType
	{
		/** 是否本月首次进入月赛首页(true表示首次进入) */
        public firstLogin:boolean;

		/** 是否获得过月赛门票  */
        public everOwnTicket:boolean;

		/** 自己的月票数  */
        public monthTicketNum:number;

		/** 连对题数 (字段可能不存在) */
        public questionNum:number;

		/** 成绩 (字段可能不存在) */
        public grade:number;

		/** 全国排名(字段可能不存在) */
        public countryRank:number;

		public pack():{[name:string]:any}
		{
			return {
				firstLogin: this.firstLogin,				
				everOwnTicket: this.everOwnTicket,				
				monthTicketNum: this.monthTicketNum,				
				questionNum: this.questionNum,				
				grade: this.grade,				
				countryRank: this.countryRank				
			};
		}
		
		public parse(data:any):MonthIndexResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.firstLogin = data.firstLogin;
			this.everOwnTicket = data.everOwnTicket;
			this.monthTicketNum = data.monthTicketNum;
			this.questionNum = data.questionNum;
			this.grade = data.grade;
			this.countryRank = data.countryRank;
			return this;
		}
	}
}