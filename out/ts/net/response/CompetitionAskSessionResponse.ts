
namespace net.response
{
	
	/**
	 * 开始竞技
	 */
	export class CompetitionAskSessionResponse extends vox.net.BaseMessageType
	{
		/** 竞技会话ID */
        public session_id:string;

		/** 用户ID */
        public player_id:number;

		/** 题目数量 */
        public question_num:number;

		/** 胜率 */
        public win_rate:number;

		/** 完成状态 */
        public finish_status:boolean;

		/** 是否是机器人 */
        public is_robot:boolean;

		/** 题目信息 */
        public questions:any[] = [];

		/** 答题信息 */
        public question_do_list:any[] = [];

		/** 竞技场完成状态 */
        public result:string;

		/** 用户本场竞技分数 */
        public player_mark:number;

		/** 对手本场竞技分数 */
        public adversary_mark:number;

		/** 对手信息 */
        public adversary:any;

		/** 竞技时间 */
        public create_at:any;

		public pack():{[name:string]:any}
		{
			return {
				session_id: this.session_id,				
				player_id: this.player_id,				
				question_num: this.question_num,				
				win_rate: this.win_rate,				
				finish_status: this.finish_status,				
				is_robot: this.is_robot,				
				questions: vox.net.packArray(this.questions),				
				question_do_list: vox.net.packArray(this.question_do_list),				
				result: this.result,				
				player_mark: this.player_mark,				
				adversary_mark: this.adversary_mark,				
				adversary: this.adversary,				
				create_at: this.create_at				
			};
		}
		
		public parse(data:any):CompetitionAskSessionResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.session_id = data.session_id;
			this.player_id = data.player_id;
			this.question_num = data.question_num;
			this.win_rate = data.win_rate;
			this.finish_status = data.finish_status;
			this.is_robot = data.is_robot;
			this.questions = vox.net.parseArray(data.questions);
			this.question_do_list = vox.net.parseArray(data.question_do_list);
			this.result = data.result;
			this.player_mark = data.player_mark;
			this.adversary_mark = data.adversary_mark;
			this.adversary = data.adversary;
			this.create_at = data.create_at;
			return this;
		}
	}
}