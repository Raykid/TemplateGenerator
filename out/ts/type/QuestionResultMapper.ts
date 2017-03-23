
namespace net.type
{
	
	/**
	 * 
	 */
	export class QuestionResultMapper extends vox.net.BaseMessageType
	{
		/**  */
        public examId:string;

		/**  */
        public finishTime:number;

		/**  */
        public answer:any;

		public pack():{[name:string]:any}
		{
			return {
				examId: this.examId,				
				finishTime: this.finishTime,				
				answer: this.answer				
			};
		}
		
		public parse(data:any):QuestionResultMapper
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.examId = data.examId;
			this.finishTime = data.finishTime;
			this.answer = data.answer;
			return this;
		}
	}
}