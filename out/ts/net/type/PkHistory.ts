
namespace net.type
{
	
	/**
	 * 关卡数据
	 */
	export class PkHistory extends vox.net.BaseMessageType
	{
		/** 对手名称 */
        public adversary_name:string;

		/** 对手学校(长) */
        public adversary_school:string;

		/** 对手学校(短) */
        public adversary_school_short:string;

		/** pk结果 */
        public result:number;

		/** 我的得分 */
        public player_mark:number;

		/** 对手得分 */
        public adversary_mark:number;

		/** pk时间 */
        public create_at:number;

		public pack():{[name:string]:any}
		{
			return {
				adversary_name: this.adversary_name,				
				adversary_school: this.adversary_school,				
				adversary_school_short: this.adversary_school_short,				
				result: this.result,				
				player_mark: this.player_mark,				
				adversary_mark: this.adversary_mark,				
				create_at: this.create_at				
			};
		}
		
		public parse(data:any):PkHistory
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.adversary_name = data.adversary_name;
			this.adversary_school = data.adversary_school;
			this.adversary_school_short = data.adversary_school_short;
			this.result = data.result;
			this.player_mark = data.player_mark;
			this.adversary_mark = data.adversary_mark;
			this.create_at = data.create_at;
			return this;
		}
	}
}