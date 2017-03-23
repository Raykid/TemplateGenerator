/// <reference path="../type/CompetitionInfoVO.ts"/>
/// <reference path="../type/RankResultVO.ts"/>

namespace net.response
{
    import CompetitionInfoVO = net.type.CompetitionInfoVO;
    import RankResultVO = net.type.RankResultVO;
	
	/**
	 * 获取首页信息以及用户相关数据
	 */
	export class IndexResponse extends vox.net.BaseMessageType
	{
		/** 是否首次进入首页 */
        public firstLogin:boolean;

		/** 学生姓名 */
        public name:string;

		/** 头像 */
        public imgUrl:string;

		/** 周赛门票数量 */
        public weekTicketNum:number;

		/** 月赛门票数量 */
        public monthTicketNum:number;

		/** 资格赛信息 */
        public dayCompetitionInfo:CompetitionInfoVO = new CompetitionInfoVO();

		/** 排位赛信息 */
        public weekCompetitionInfo:CompetitionInfoVO = new CompetitionInfoVO();

		/** 月赛信息 */
        public monthCompetitionInfo:CompetitionInfoVO = new CompetitionInfoVO();

		/** 发奖结果popUp，因为每次比赛结束只显示一次，如有该字段则弹出，没有该字段时不处理 */
        public rankResultList:RankResultVO[] = [];

		public pack():{[name:string]:any}
		{
			return {
				firstLogin: this.firstLogin,				
				name: this.name,				
				imgUrl: this.imgUrl,				
				weekTicketNum: this.weekTicketNum,				
				monthTicketNum: this.monthTicketNum,				
				dayCompetitionInfo: this.dayCompetitionInfo.pack(),				
				weekCompetitionInfo: this.weekCompetitionInfo.pack(),				
				monthCompetitionInfo: this.monthCompetitionInfo.pack(),				
				rankResultList: vox.net.packArray(this.rankResultList)				
			};
		}
		
		public parse(data:any):IndexResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.firstLogin = data.firstLogin;
			this.name = data.name;
			this.imgUrl = data.imgUrl;
			this.weekTicketNum = data.weekTicketNum;
			this.monthTicketNum = data.monthTicketNum;
			this.dayCompetitionInfo = new net.type.CompetitionInfoVO().parse(data.dayCompetitionInfo);
			this.weekCompetitionInfo = new net.type.CompetitionInfoVO().parse(data.weekCompetitionInfo);
			this.monthCompetitionInfo = new net.type.CompetitionInfoVO().parse(data.monthCompetitionInfo);
			this.rankResultList = vox.net.parseArray(data.rankResultList, RankResultVO);
			return this;
		}
	}
}