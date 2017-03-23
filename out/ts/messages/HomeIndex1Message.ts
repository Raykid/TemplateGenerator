namespace net.messages
{
	/**
	 * 首页消息
	 */
	export class HomeIndex1Message extends vox.net.BaseRequestMessage
	{
		public constructor()
		{
			super(MessageType.HomeIndex1);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/afenti/api/login.vpage");
		}
		
		public __useGet(): Boolean
		{
			return true;
		}
	}
}