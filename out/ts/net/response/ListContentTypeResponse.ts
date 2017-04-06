/// <reference path="../type/ContentType.ts"/>

namespace net.response
{
    import ContentType = net.type.ContentType;
	
	/**
	 * 字词英雄板块列表
	 */
	export class ListContentTypeResponse extends vox.net.BaseMessageType
	{
		/** 板块列表 */
        public list:ContentType[] = [];

		public pack():{[name:string]:any}
		{
			return {
				list: vox.net.packArray(this.list)				
			};
		}
		
		public parse(data:any):ListContentTypeResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.list = vox.net.parseArray(data.list, ContentType);
			return this;
		}
	}
}