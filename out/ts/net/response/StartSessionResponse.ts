
namespace net.response
{
	
	/**
	 * 开始闯关
	 */
	export class StartSessionResponse extends vox.net.BaseMessageType
	{
		public pack():{[name:string]:any}
		{
			return {
			};
		}
		
		public parse(data:any):StartSessionResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			return this;
		}
	}
}