/// <reference path="../type/GiftVO.ts"/>

namespace net.response
{
    import GiftVO = net.type.GiftVO;
	
	/**
	 * 
	 */
	export class GiftIndexResponse extends vox.net.BaseMessageType
	{
		/** 礼包列表(这块前端写死也是OK的，固定数据) */
        public giftList:GiftVO[] = [];

		/** 0:不可领取 1:可领取 2:已经领取 */
        public receiveState:number;

		/** 阿分提相应(英语、数学)产品开通与否 */
        public opendProduct:boolean;

		public pack():{[name:string]:any}
		{
			return {
				giftList: vox.net.packArray(this.giftList),				
				receiveState: this.receiveState,				
				opendProduct: this.opendProduct				
			};
		}
		
		public parse(data:any):GiftIndexResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.giftList = vox.net.parseArray(data.giftList, GiftVO);
			this.receiveState = data.receiveState;
			this.opendProduct = data.opendProduct;
			return this;
		}
	}
}