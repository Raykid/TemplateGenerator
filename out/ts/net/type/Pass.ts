
namespace net.type
{
	
	/**
	 * 关卡数据
	 */
	export class Pass extends vox.net.BaseMessageType
	{
		/** 关卡ID */
        public id:number;

		/** 关卡名称 */
        public name:string;

		/** pass|package: 关卡|礼包 */
        public type:string;

		/** 关卡状态: 0.未开启;1.已开启;2.中途退出;3.订正;4.完成 */
        public status:number;

		/** 是否锁定 */
        public locked:boolean;

		public pack():{[name:string]:any}
		{
			return {
				id: this.id,				
				name: this.name,				
				type: this.type,				
				status: this.status,				
				locked: this.locked				
			};
		}
		
		public parse(data:any):Pass
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.id = data.id;
			this.name = data.name;
			this.type = data.type;
			this.status = data.status;
			this.locked = data.locked;
			return this;
		}
	}
}