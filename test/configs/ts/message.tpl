namespace $a-{pkg}
{
    $a-{for: type in getCustomTypes(fields)}
    import $a-{type.to} = $a-{fieldPkg}.$a-{type.to};
    $a-{end for}
	/**
	 * $a-{comment}
	 */
	export class $a-{name}Message extends vox.net.BaseRequestMessage
	{
		$a-{for: field in fields}
		/** $a-{field.comment} */
		$a-{if: field.type.class == "basic"}
        public $a-{field.name}:$a-{field.type.to};
        $a-{end if}
		$a-{if: field.type.class == "custom"}
        public $a-{field.name}:$a-{field.type.to} = new $a-{field.type.to}();
        $a-{end if}
        $a-{if: field.type.class == "array"}
        public $a-{field.name}:$a-{field.type.to} = [];
        $a-{end if}
        $a-{if: field.type.class == "map"}
        public $a-{field.name}:$a-{field.type.to} = {};
        $a-{end if}

		$a-{end for}
		public constructor()
		{
			super(MessageType.$a-{name});
		}
		
		public __url(): string
		{
			var context:vox.context.ApplicationContext = vox.context.ContextManager.context;
			var config:vox.system.SystemConfig = context.getSystemConfig();
			return ((config.domains[$a-{domainIndex}] || config.domain) + "$a-{url}");
		}
		
		public __useGet(): Boolean
		{
			return $a-{method == "GET"};
		}
	}
}