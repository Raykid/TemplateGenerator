
namespace net.type
{
	
	/**
	 * 用户信息
	 */
	export class PlayerProfile extends vox.net.BaseMessageType
	{
		/** 真实姓名 */
        public real_name:string;

		/** 用户ID */
        public user_id:number;

		/** 用户头像 */
        public avatar_url:string;

		/** 竞技卡数量 */
        public ticket:number;

		/** 金币 */
        public gold:number;

		/** 自学积分 */
        public credit:number;

		/** 本周竞技总分 */
        public score:number;

		/** 城市排名 */
        public city_rank:number;

		/** 全省排名 */
        public state_rank:number;

		/** 闯关星星数 */
        public star:number;

		/** 开通状态 unpaid:未开通;active:已开通;expired:已过期 */
        public product_status:string;

		/** 过期时间 */
        public expire_time:number;

		/** 是否新手（0是，否则不是） */
        public player_status:number;

		public pack():{[name:string]:any}
		{
			return {
				real_name: this.real_name,				
				user_id: this.user_id,				
				avatar_url: this.avatar_url,				
				ticket: this.ticket,				
				gold: this.gold,				
				credit: this.credit,				
				score: this.score,				
				city_rank: this.city_rank,				
				state_rank: this.state_rank,				
				star: this.star,				
				product_status: this.product_status,				
				expire_time: this.expire_time,				
				player_status: this.player_status				
			};
		}
		
		public parse(data:any):PlayerProfile
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.real_name = data.real_name;
			this.user_id = data.user_id;
			this.avatar_url = data.avatar_url;
			this.ticket = data.ticket;
			this.gold = data.gold;
			this.credit = data.credit;
			this.score = data.score;
			this.city_rank = data.city_rank;
			this.state_rank = data.state_rank;
			this.star = data.star;
			this.product_status = data.product_status;
			this.expire_time = data.expire_time;
			this.player_status = data.player_status;
			return this;
		}
	}
}