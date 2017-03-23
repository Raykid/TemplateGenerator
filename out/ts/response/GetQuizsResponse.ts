/// <reference path="../undefined/String.ts"/>

namespace net.response
{
    import String = net.undefined.String;
	
	/**
	 * 
	 */
	export class GetQuizsResponse extends vox.net.BaseMessageType
	{
		/** 题目id列表 */
        public questionList:String[] = [];

		/** 竞赛id */
        public competitionId:string;

		public pack():{[name:string]:any}
		{
			return {
				questionList: vox.net.packArray(this.questionList),				
				competitionId: this.competitionId				
			};
		}
		
		public parse(data:any):GetQuizsResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.questionList = vox.net.parseArray(data.questionList, String);
			this.competitionId = data.competitionId;
			return this;
		}
	}
}