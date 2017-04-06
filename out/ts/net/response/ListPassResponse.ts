/// <reference path="../type/Pass.ts"/>

namespace net.response
{
    import Pass = net.type.Pass;
	
	/**
	 * 字词英雄关卡列表
	 */
	export class ListPassResponse extends vox.net.BaseMessageType
	{
		/** 关卡列表 */
        public list:Pass[] = [];

		public pack():{[name:string]:any}
		{
			return {
				list: vox.net.packArray(this.list)				
			};
		}
		
		public parse(data:any):ListPassResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.list = vox.net.parseArray(data.list, Pass);
			return this;
		}
	}
}