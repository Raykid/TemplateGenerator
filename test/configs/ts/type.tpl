$a-{for: type in getCustomTypes(fields)}
/// <reference path="../$a-{getConfigByName(type.to).field}/$a-{type.to}.ts"/>
$a-{end for}

namespace net.$a-{field}
{
    $a-{for: type in getCustomTypes(fields)}
    import $a-{type.to} = net.$a-{getConfigByName(type.to).field}.$a-{type.to};
    $a-{end for}
	
	/**
	 * $a-{comment}
	 */
	export class $a-{name} extends vox.net.BaseMessageType
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
		public pack():{[name:string]:any}
		{
			return {
				$a-{for: field in fields}
				$a-{field.name}: $a-{}
				$a-{if: field.type.class == "basic"}this.$a-{field.name}$a-{end if}
				$a-{if: field.type.class == "custom"}this.$a-{field.name}.pack()$a-{end if}
				$a-{if: field.type.class == "array"}vox.net.packArray(this.$a-{field.name})$a-{end if}
				$a-{if: field.type.class == "map"}vox.net.packMap(this.$a-{field.name})$a-{end if}
				$a-{if: $index < fields.length - 1},$a-{end if}
				
				$a-{end for}
			};
		}
		
		public parse(data:any):$a-{name}
		{
			if(data == null) return null;
			super.parse(data);
			this.success = data.success;
			$a-{for: field in fields}
			$a-{if: field.type.class == "basic"}
			this.$a-{field.name} = data.$a-{field.name};
			$a-{end if}
			$a-{if: field.type.class == "custom"}
			this.$a-{field.name} = new net.$a-{getConfigByName(field.type.to).field}.$a-{field.type.to}().parse(data.$a-{field.name});
			$a-{end if}
			$a-{if: field.type.class == "array"}
			this.$a-{field.name} = vox.net.parseArray(data.$a-{field.name}$a-{if: field.type.customName != null}, $a-{field.type.customName}$a-{end if});
			$a-{end if}
			$a-{if: field.type.class == "map"}
			this.$a-{field.name} = vox.net.parseMap(data.$a-{field.name}$a-{if: field.type.customName != null}, $a-{field.type.customName}$a-{end if});
			$a-{end if}
			$a-{end for}
			return this;
		}
	}
}