/// <reference path="../type/Difficulty.ts"/>

namespace net.response
{
    import Difficulty = net.type.Difficulty;
	
	/**
	 * 闯关首页
	 */
	export class PassIndexResponse extends vox.net.BaseMessageType
	{
		/** 已选中难度级别 */
        public selected_difficulty:string;

		/** 难度级别列表 */
        public difficulty_list:Difficulty[] = [];

		public pack():{[name:string]:any}
		{
			return {
				selected_difficulty: this.selected_difficulty,				
				difficulty_list: vox.net.packArray(this.difficulty_list)				
			};
		}
		
		public parse(data:any):PassIndexResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.selected_difficulty = data.selected_difficulty;
			this.difficulty_list = vox.net.parseArray(data.difficulty_list, Difficulty);
			return this;
		}
	}
}