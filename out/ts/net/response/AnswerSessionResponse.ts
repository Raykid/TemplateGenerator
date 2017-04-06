
namespace net.response
{
	
	/**
	 * 闯关答题
	 */
	export class AnswerSessionResponse extends vox.net.BaseMessageType
	{
		public pack():{[name:string]:any}
		{
			return {
			};
		}
		
		public parse(data:any):AnswerSessionResponse
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			return this;
		}
	}
}