
namespace net.response
{
	
	/**
	 * 
	 */
	export class GetProvinceRankResponse extends vox.net.BaseMessageType
	{
		/** true表示是本周,false表示为上一周  */
        public thisWeekFlag:boolean;

		/** 月赛榜上的月份  */
        public month:number;

		/** 省榜单上的省名 */
        public provinceName:string;

		/** 用户本人个人成绩信息 (该字段可能不存在) */
        public studentGradeInfo:undefined = new undefined();

		/** 省榜单前100名成绩信息,字段可能不存在(前100名有时会对应100多个学生) */
        public provinceGradeInfoList:undefined = new undefined();

		/** 分页信息  */
        public pageInfo:undefined = new undefined();

		public pack():{[name:string]:any}
		{
			return {
				thisWeekFlag: this.thisWeekFlag,				
				month: this.month,				
				provinceName: this.provinceName,				
				studentGradeInfo: this.studentGradeInfo.pack(),				
				provinceGradeInfoList: this.provinceGradeInfoList.pack(),				
				pageInfo: this.pageInfo.pack()				
			};
		}
		
		public parse(data:any):GetProvinceRankResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.thisWeekFlag = data.thisWeekFlag;
			this.month = data.month;
			this.provinceName = data.provinceName;
			this.studentGradeInfo = new net.undefined.undefined().parse(data.studentGradeInfo);
			this.provinceGradeInfoList = new net.undefined.undefined().parse(data.provinceGradeInfoList);
			this.pageInfo = new net.undefined.undefined().parse(data.pageInfo);
			return this;
		}
	}
}