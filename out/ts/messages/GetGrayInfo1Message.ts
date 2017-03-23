namespace net.message
{
    import OtherVO1 = net.type.OtherVO1;
	/**
	 * 这是一个十足的测试消息
	 */
	export class GetGrayInfo1Message extends vox.net.BaseRequestMessage
	{
		/** 测试byte类型 */
        public testByte:number;
false
		/** 测试short类型 */
        public testShort:number;
false
		/** 测试int类型 */
        public testInt:number;
false
		/** 测试long类型 */
        public testLong:string;
false
		/** 测试float类型 */
        public testFloat:number;
false
		/** 测试double类型 */
        public testDouble:number;
false
		/** 测试string类型 */
        public testString:string;
false
		/** 测试boolean类型 */
        public testBoolean:boolean;
false
		/** 测试any类型 */
        public testAny:any;
false
		/** 测试简单类型数组 */
        public testArray:number[] = [];
false
		/** 测试简单类型表 */
        public testMap:{[key:string]:number} = {};
false
		/** 测试复杂类型 */
        public other:OtherVO1 = new OtherVO1();
true
		/** 测试复杂类型数组 */
        public others:OtherVO1[] = [];
true
		/** 测试复杂类型表 */
        public otherMap:{[key:string]:OtherVO1} = {};
true
		public constructor()
		{
			super(MessageType.GetGrayInfo1);
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[0] || config.domain) + "/afenti/api/gray.vpage");
		}
		
		public __useGet(): Boolean
		{
			return false;
		}
	}
}