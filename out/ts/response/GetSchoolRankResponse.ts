
namespace net.response
{
	
	/**
	 * 
	 */
	export class GetSchoolRankResponse extends vox.net.BaseMessageType
	{
		/** true表示是本周,false表示为上一周  */
        public thisWeekFlag:boolean;

		/** 月赛榜上的月份  */
        public month:number;

		/** 省榜单上的省名 */
        public provinceName:string;

		/** 用户本人个人成绩信息 (该字段可能不存在) */
        public studentGradeInfo:undefined = new undefined();

		/** 校榜前20名成绩,字段可能不存在(前20名有时会对应20多个学生) */
        public schoolGradeInfoList:undefined = new undefined();

		public pack():{[name:string]:any}
		{
			return {
				thisWeekFlag: this.thisWeekFlag,				
				month: this.month,				
				provinceName: this.provinceName,				
				studentGradeInfo: this.studentGradeInfo.pack(),				
				schoolGradeInfoList: this.schoolGradeInfoList.pack()				
			};
		}
		
		public parse(data:any):GetSchoolRankResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.thisWeekFlag = data.thisWeekFlag;
			this.month = data.month;
			this.provinceName = data.provinceName;
			this.studentGradeInfo = new net.undefined.undefined().parse(data.studentGradeInfo);
			this.schoolGradeInfoList = new net.undefined.undefined().parse(data.schoolGradeInfoList);
			return this;
		}
	}
}