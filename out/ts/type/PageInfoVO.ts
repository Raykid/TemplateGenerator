
namespace net.type
{
	
	/**
	 * 
	 */
	export class PageInfoVO extends vox.net.BaseMessageType
	{
		/** 当前页(从0开始计算,0表示第一页) */
        public currentPage:number;

		/** 当前页的数据量 */
        public currentPageSize:number;

		/** 总页数 */
        public totalPage:number;

		public pack():{[name:string]:any}
		{
			return {
				currentPage: this.currentPage,				
				currentPageSize: this.currentPageSize,				
				totalPage: this.totalPage				
			};
		}
		
		public parse(data:any):PageInfoVO
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			this.currentPage = data.currentPage;
			this.currentPageSize = data.currentPageSize;
			this.totalPage = data.totalPage;
			return this;
		}
	}
}