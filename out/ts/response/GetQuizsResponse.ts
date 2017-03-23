
namespace net.response
{
	
	/**
	 * 
	 */
	export class GetQuizsResponse extends vox.net.BaseMessageType
	{
		/** 题目id列表 */
        public questionList:undefined = new undefined();

		/** 竞赛id */
        public competitionId:string;

		public pack():{[name:string]:any}
		{
			return {
				questionList: this.questionList.pack(),				
				competitionId: this.competitionId				
			};
		}
		
		public parse(data:any):GetQuizsResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.questionList = new net.undefined.undefined().parse(data.questionList);
			this.competitionId = data.competitionId;
			return this;
		}
	}
}