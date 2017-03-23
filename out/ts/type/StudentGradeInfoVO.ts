
namespace net.type
{
	
	/**
	 * 
	 */
	export class StudentGradeInfoVO extends vox.net.BaseMessageType
	{
		/** 学生姓名 */
        public studentName:string;

		/** 得分成绩 */
        public score:number;

		/** 榜单上的 排名 */
        public rank:number;

		/** 学校名 */
        public schoolName:string;

		/** 学生头像url */
        public imgUrl:string;

		public pack():{[name:string]:any}
		{
			return {
				studentName: this.studentName,				
				score: this.score,				
				rank: this.rank,				
				schoolName: this.schoolName,				
				imgUrl: this.imgUrl				
			};
		}
		
		public parse(data:any):StudentGradeInfoVO
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.studentName = data.studentName;
			this.score = data.score;
			this.rank = data.rank;
			this.schoolName = data.schoolName;
			this.imgUrl = data.imgUrl;
			return this;
		}
	}
}