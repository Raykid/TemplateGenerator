
namespace net.response
{
	
	/**
	 * 竞技场答题页
	 */
	export class CompetitionReplySessionResponse extends vox.net.BaseMessageType
	{
		/** 用户答案是否正确 */
        public player_is_right:boolean;

		/** 对手答案是否正确 */
        public adversary_is_right:boolean;

		/** 用户得分 */
        public player_marks:number;

		/** 用户本场竞技当前总分 */
        public player_now_marks:number;

		/** 对手得分 */
        public adversary_marks:number;

		/** 对手本场竞技当前总分 */
        public adversary_now_marks:number;

		/** 竞技场状态(0:平; 1:胜; 2:输; -1:为开始) */
        public result:number;

		/** 当前题号 */
        public question_num:string;

		/** 全市排名 */
        public city_rank:number;

		/** 全省排名 */
        public state_rank:number;

		public pack():{[name:string]:any}
		{
			return {
				player_is_right: this.player_is_right,				
				adversary_is_right: this.adversary_is_right,				
				player_marks: this.player_marks,				
				player_now_marks: this.player_now_marks,				
				adversary_marks: this.adversary_marks,				
				adversary_now_marks: this.adversary_now_marks,				
				result: this.result,				
				question_num: this.question_num,				
				city_rank: this.city_rank,				
				state_rank: this.state_rank				
			};
		}
		
		public parse(data:any):CompetitionReplySessionResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.player_is_right = data.player_is_right;
			this.adversary_is_right = data.adversary_is_right;
			this.player_marks = data.player_marks;
			this.player_now_marks = data.player_now_marks;
			this.adversary_marks = data.adversary_marks;
			this.adversary_now_marks = data.adversary_now_marks;
			this.result = data.result;
			this.question_num = data.question_num;
			this.city_rank = data.city_rank;
			this.state_rank = data.state_rank;
			return this;
		}
	}
}