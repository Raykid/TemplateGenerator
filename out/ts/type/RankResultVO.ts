
namespace net.type
{
	
	/**
	 * 
	 */
	export class RankResultVO extends vox.net.BaseMessageType
	{
		/** 赛域(lastWeek 上周排位赛奖励、thisWeek 本周排位赛奖励、lastMonth 上月月赛奖励) */
        public rankField:string;

		/** 赛种(ProvinceRank 省榜、SchoolRank 校榜、WholeRank 全国榜) */
        public rankType:string;

		/** 排名 */
        public rank:number;

		/** 是否有礼物奖励 */
        public hasGift:boolean;

		/** 礼物列表 */
        public giftList:undefined = new undefined();

		public pack():{[name:string]:any}
		{
			return {
				rankField: this.rankField,				
				rankType: this.rankType,				
				rank: this.rank,				
				hasGift: this.hasGift,				
				giftList: this.giftList.pack()				
			};
		}
		
		public parse(data:any):RankResultVO
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.rankField = data.rankField;
			this.rankType = data.rankType;
			this.rank = data.rank;
			this.hasGift = data.hasGift;
			this.giftList = new net.undefined.undefined().parse(data.giftList);
			return this;
		}
	}
}