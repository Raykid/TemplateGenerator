
namespace net.response
{
	
	/**
	 * 
	 */
	export class GetNationRankResponse extends vox.net.BaseMessageType
	{
		/** true表示是本周,false表示为上一周  */
        public thisWeekFlag:boolean;

		/** 月赛榜上的月份  */
        public month:number;

		/** *月*号(非月赛期间有该字段,榜单下方要用到)  */
        public endDate:string;

		/** 省榜单上的省名 */
        public provinceName:string;

		/** 用户本人个人成绩信息 (该字段可能不存在) */
        public studentGradeInfo:undefined = new undefined();

		/** 全国榜单学生信息，根据分页信息获取的数据；没有数据时,字段不存在 */
        public countryGradeInfoList:undefined = new undefined();

		/** 分页信息  */
        public pageInfo:undefined = new undefined();

		public pack():{[name:string]:any}
		{
			return {
				thisWeekFlag: this.thisWeekFlag,				
				month: this.month,				
				endDate: this.endDate,				
				provinceName: this.provinceName,				
				studentGradeInfo: this.studentGradeInfo.pack(),				
				countryGradeInfoList: this.countryGradeInfoList.pack(),				
				pageInfo: this.pageInfo.pack()				
			};
		}
		
		public parse(data:any):GetNationRankResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.thisWeekFlag = data.thisWeekFlag;
			this.month = data.month;
			this.endDate = data.endDate;
			this.provinceName = data.provinceName;
			this.studentGradeInfo = new net.undefined.undefined().parse(data.studentGradeInfo);
			this.countryGradeInfoList = new net.undefined.undefined().parse(data.countryGradeInfoList);
			this.pageInfo = new net.undefined.undefined().parse(data.pageInfo);
			return this;
		}
	}
}