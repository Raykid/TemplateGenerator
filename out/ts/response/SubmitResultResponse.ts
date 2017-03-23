
namespace net.response
{
	
	/**
	 * 
	 */
	export class SubmitResultResponse extends vox.net.BaseMessageType
	{
		/** 是否结束 */
        public finished:boolean;

		/** 回答是否正确 */
        public answerCorrect:boolean;

		/** 当前总分 */
        public totalScore:number;

		/** 当前题目获得分数 */
        public questionScore:number;

		/** 小题答案 */
        public blankRightList:undefined = new undefined();

		/** 资格赛结果（全部答完） */
        public dayCompetitionResult:any;

		/** 排行赛结果（有错误题目出现） */
        public weekCompetitionResult:any;

		/** 月赛结果（有错误题目出现） */
        public monthCompetitionResult:any;

		public pack():{[name:string]:any}
		{
			return {
				finished: this.finished,				
				answerCorrect: this.answerCorrect,				
				totalScore: this.totalScore,				
				questionScore: this.questionScore,				
				blankRightList: this.blankRightList.pack(),				
				dayCompetitionResult: this.dayCompetitionResult,				
				weekCompetitionResult: this.weekCompetitionResult,				
				monthCompetitionResult: this.monthCompetitionResult				
			};
		}
		
		public parse(data:any):SubmitResultResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.finished = data.finished;
			this.answerCorrect = data.answerCorrect;
			this.totalScore = data.totalScore;
			this.questionScore = data.questionScore;
			this.blankRightList = new net.undefined.undefined().parse(data.blankRightList);
			this.dayCompetitionResult = data.dayCompetitionResult;
			this.weekCompetitionResult = data.weekCompetitionResult;
			this.monthCompetitionResult = data.monthCompetitionResult;
			return this;
		}
	}
}