
namespace net.response
{
	
	/**
	 * 
	 */
	export class GetGiftResponse extends vox.net.BaseMessageType
	{
		/** 已领取的礼包列表 */
        public receivedGiftList:undefined = new undefined();

		/** 0:不可领取 1:可领取 2:已经领取 */
        public receiveState:number;

		public pack():{[name:string]:any}
		{
			return {
				receivedGiftList: this.receivedGiftList.pack(),				
				receiveState: this.receiveState				
			};
		}
		
		public parse(data:any):GetGiftResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.receivedGiftList = new net.undefined.undefined().parse(data.receivedGiftList);
			this.receiveState = data.receiveState;
			return this;
		}
	}
}