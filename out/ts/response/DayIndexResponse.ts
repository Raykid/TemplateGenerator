
namespace net.response
{
	
	/**
	 * 资格赛首页
	 */
	export class DayIndexResponse extends vox.net.BaseMessageType
	{
		/** 本周1到周5是否首次进入资格赛首页(true表示首次进入) */
        public firstLogin:boolean;

		/** 最高成绩(可能字段不存在) */
        public grade:number;

		/** 奖励的门票数量 */
        public totalTickets:number;

		/** 自己资格赛剩余次数 */
        public dayTicketNum:number;

		/** 应用APP付费状况 0:未付费过,1:购买已过期,2:有效期内 */
        public appStatus:number;

		public pack():{[name:string]:any}
		{
			return {
				firstLogin: this.firstLogin,				
				grade: this.grade,				
				totalTickets: this.totalTickets,				
				dayTicketNum: this.dayTicketNum,				
				appStatus: this.appStatus				
			};
		}
		
		public parse(data:any):DayIndexResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.firstLogin = data.firstLogin;
			this.grade = data.grade;
			this.totalTickets = data.totalTickets;
			this.dayTicketNum = data.dayTicketNum;
			this.appStatus = data.appStatus;
			return this;
		}
	}
}