
namespace net.type
{
	
	/**
	 * 
	 */
	export class GiftVO extends vox.net.BaseMessageType
	{
		/** 礼物类型(mathWeekTicket 数学月赛票/englishWeekTicket 英语月赛票) */
        public type:string;

		/** 礼物名称 */
        public name:string;

		/** 礼物数量 */
        public count:number;

		/** 数量单位 */
        public unit:string;

		public pack():{[name:string]:any}
		{
			return {
				type: this.type,				
				name: this.name,				
				count: this.count,				
				unit: this.unit				
			};
		}
		
		public parse(data:any):GiftVO
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.type = data.type;
			this.name = data.name;
			this.count = data.count;
			this.unit = data.unit;
			return this;
		}
	}
}