namespace net.messages
{
	/**
	 * 弹窗
	 */
	export class GetPopupInfo1Message extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.GetPopupInfo1);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/afenti/api/popup.vpage");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
}