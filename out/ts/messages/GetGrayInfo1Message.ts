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

    undefined
		/** 测试short类型 */
        public testShort:number;

    undefined
		/** 测试int类型 */
        public testInt:number;

    undefined
		/** 测试long类型 */
        public testLong:string;

    undefined
		/** 测试float类型 */
        public testFloat:number;

    undefined
		/** 测试double类型 */
        public testDouble:number;

    undefined
		/** 测试string类型 */
        public testString:string;

    undefined
		/** 测试boolean类型 */
        public testBoolean:boolean;

    undefined
		/** 测试any类型 */
        public testAny:any;

    undefined
		/** 测试简单类型数组 */
        public testArray:number[] = [];

    undefined
		/** 测试简单类型表 */
        public testMap:{[key:string]:number} = {};

    undefined
		/** 测试复杂类型 */
        public other:OtherVO1 = new OtherVO1();

    OtherVO1
		/** 测试复杂类型数组 */
        public others:OtherVO1[] = [];

    OtherVO1
		/** 测试复杂类型表 */
        public otherMap:{[key:string]:OtherVO1} = {};

    OtherVO1
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