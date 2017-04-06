/// <reference path="../type/PlayerProfile.ts"/>

namespace net.response
{
    import PlayerProfile = net.type.PlayerProfile;
	
	/**
	 * 首页
	 */
	export class IndexResponse extends vox.net.BaseMessageType
	{
		/** 用户信息 */
        public player_profile:PlayerProfile = new PlayerProfile();

		/** 总的应得星星数(按级别统计) */
        public total_star:number;

		/** 任务奖励领取提示 */
        public new_task_rewards:number;

		/** 新的成就奖励数 */
        public new_achievement_rewards:number;

		public pack():{[name:string]:any}
		{
			return {
				player_profile: this.player_profile.pack(),				
				total_star: this.total_star,				
				new_task_rewards: this.new_task_rewards,				
				new_achievement_rewards: this.new_achievement_rewards				
			};
		}
		
		public parse(data:any):IndexResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.player_profile = new net.type.PlayerProfile().parse(data.player_profile);
			this.total_star = data.total_star;
			this.new_task_rewards = data.new_task_rewards;
			this.new_achievement_rewards = data.new_achievement_rewards;
			return this;
		}
	}
}