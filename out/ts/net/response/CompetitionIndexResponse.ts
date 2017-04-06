/// <reference path="../type/PlayerProfile.ts"/>

namespace net.response
{
    import PlayerProfile = net.type.PlayerProfile;
	
	/**
	 * 竞技场首页
	 */
	export class CompetitionIndexResponse extends vox.net.BaseMessageType
	{
		/** 用户信息 */
        public player_profile:PlayerProfile = new PlayerProfile();

		public pack():{[name:string]:any}
		{
			return {
				player_profile: this.player_profile.pack()				
			};
		}
		
		public parse(data:any):CompetitionIndexResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.player_profile = new net.type.PlayerProfile().parse(data.player_profile);
			return this;
		}
	}
}