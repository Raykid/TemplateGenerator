/// <reference path="../type/GiftVO.ts"/>

namespace net.response
{
    import GiftVO = net.type.GiftVO;
	
	/**
	 * 
	 */
	export class GetGiftResponse extends vox.net.BaseMessageType
	{
		/** 已领取的礼包列表 */
        public receivedGiftList:GiftVO[] = [];

		/** 0:不可领取 1:可领取 2:已经领取 */
        public receiveState:number;

		public pack():{[name:string]:any}
		{
			return {
				receivedGiftList: vox.net.packArray(this.receivedGiftList),				
				receiveState: this.receiveState				
			};
		}
		
		public parse(data:any):GetGiftResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.receivedGiftList = vox.net.parseArray(data.receivedGiftList, GiftVO);
			this.receiveState = data.receiveState;
			return this;
		}
	}
}