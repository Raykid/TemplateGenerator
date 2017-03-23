
namespace net.type
{
	
	/**
	 * 
	 */
	export class ResultVO extends vox.net.BaseMessageType
	{
		/** 题目ID */
        public qid:string;

		/** 客户端类型：pc,mobile */
        public clientType:string;

		/** 客户端名称:***app */
        public clientName:string;

		/** 完成时间 */
        public finishTime:number;

		/** 答案 */
        public answer:any;

		/** 扩展属性，没有可以为空 */
        public additions:any;

		public pack():{[name:string]:any}
		{
			return {
				qid: this.qid,				
				clientType: this.clientType,				
				clientName: this.clientName,				
				finishTime: this.finishTime,				
				answer: this.answer,				
				additions: this.additions				
			};
		}
		
		public parse(data:any):ResultVO
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.qid = data.qid;
			this.clientType = data.clientType;
			this.clientName = data.clientName;
			this.finishTime = data.finishTime;
			this.answer = data.answer;
			this.additions = data.additions;
			return this;
		}
	}
}