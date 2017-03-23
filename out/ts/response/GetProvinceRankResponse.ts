/// <reference path="../type/StudentGradeInfoVO.ts"/>
/// <reference path="../type/PageInfoVO.ts"/>

namespace net.response
{
    import StudentGradeInfoVO = net.type.StudentGradeInfoVO;
    import PageInfoVO = net.type.PageInfoVO;
	
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
        public studentGradeInfo:StudentGradeInfoVO = new StudentGradeInfoVO();

		/** 省榜单前100名成绩信息,字段可能不存在(前100名有时会对应100多个学生) */
        public provinceGradeInfoList:StudentGradeInfoVO[] = [];

		/** 分页信息  */
        public pageInfo:PageInfoVO = new PageInfoVO();

		public pack():{[name:string]:any}
		{
			return {
				thisWeekFlag: this.thisWeekFlag,				
				month: this.month,				
				provinceName: this.provinceName,				
				studentGradeInfo: this.studentGradeInfo.pack(),				
				provinceGradeInfoList: vox.net.packArray(this.provinceGradeInfoList),				
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
			this.studentGradeInfo = new net.type.StudentGradeInfoVO().parse(data.studentGradeInfo);
			this.provinceGradeInfoList = vox.net.parseArray(data.provinceGradeInfoList, StudentGradeInfoVO);
			this.pageInfo = new net.type.PageInfoVO().parse(data.pageInfo);
			return this;
		}
	}
}