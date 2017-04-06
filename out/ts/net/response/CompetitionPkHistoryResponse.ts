/// <reference path="../type/PkHistory.ts"/>

namespace net.response
{
    import PkHistory = net.type.PkHistory;
	
	/**
	 * 我的战绩
	 */
	export class CompetitionPkHistoryResponse extends vox.net.BaseMessageType
	{
		/** 我的战绩 */
        public create_at:PkHistory[] = [];

		public pack():{[name:string]:any}
		{
			return {
				create_at: vox.net.packArray(this.create_at)				
			};
		}
		
		public parse(data:any):CompetitionPkHistoryResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.create_at = vox.net.parseArray(data.create_at, PkHistory);
			return this;
		}
	}
}