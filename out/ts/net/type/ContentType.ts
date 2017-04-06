
namespace net.type
{
	
	/**
	 * 板块数据
	 */
	export class ContentType extends vox.net.BaseMessageType
	{
		/** 板块ID */
        public id:number;

		/** 板块名称 */
        public name:string;

		/** 板块星星总数 */
        public total_star:number;

		/** 已获得的星星数 */
        public star:number;

		/** 是否锁定 */
        public locked:boolean;

		public pack():{[name:string]:any}
		{
			return {
				id: this.id,				
				name: this.name,				
				total_star: this.total_star,				
				star: this.star,				
				locked: this.locked				
			};
		}
		
		public parse(data:any):ContentType
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.id = data.id;
			this.name = data.name;
			this.total_star = data.total_star;
			this.star = data.star;
			this.locked = data.locked;
			return this;
		}
	}
}