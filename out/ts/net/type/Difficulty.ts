
namespace net.type
{
	
	/**
	 * 难度
	 */
	export class Difficulty extends vox.net.BaseMessageType
	{
		/** 难度key */
        public key:string;

		/** 难度名称 */
        public name:string;

		public pack():{[name:string]:any}
		{
			return {
				key: this.key,				
				name: this.name				
			};
		}
		
		public parse(data:any):Difficulty
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.key = data.key;
			this.name = data.name;
			return this;
		}
	}
}