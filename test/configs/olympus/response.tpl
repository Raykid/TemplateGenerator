import ResponseData, { IResponseParams } from "olympus-r/engine/net/ResponseData";
import { netManager } from "olympus-r/engine/net/NetManager";
import * as NetUtil from "olympus-r/engine/net/NetUtil";
$a-{for: name in getCustomNames(fields)}
import $a-{name} from "../type/$a-{name}";
$a-{end for}

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * $a-{comment}
*/
export default class $a-{name}Response extends ResponseData
{
    $a-{for: field in fields}
    /**
     * $a-{field.comment}
     * 
     * @type {$a-{field.type.to}}
     * @memberof $a-{name}Response
     */
    $a-{if: field.type.class == "basic"}
    public $a-{field.name}: $a-{field.type.to};
    $a-{end if}
    $a-{if: field.type.class == "custom"}
    public $a-{field.name}: $a-{field.type.to};
    $a-{end if}
    $a-{if: field.type.class == "array"}
    public $a-{field.name}: $a-{field.type.to} = [];
    $a-{end if}
    $a-{if: field.type.class == "map"}
    public $a-{field.name}: $a-{field.type.to} = {};
    $a-{end if}

    $a-{end for}
    public __params: IResponseParams = { type: "$a-{name}" };

    public get success(): boolean
    {
        return this.__params.success;
    }

    public get errorCode(): number
    {
        return this.__params.errorCode;
    }

    public get info(): string
    {
        return this.__params.info;
    }
	
	public get currentTime(): string
	{
		return this.__params.currentTime;
	}

    public static type: string = "$a-{name}";

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        data = JSON.parse(data);
        this.__params.success = data.success;
        this.__params.errorCode = data.errorCode;
        this.__params.info = data.info;
        this.__params.currentTime = data.currentTime;
        $a-{for: field in fields}
        $a-{if: field.type.class == "basic"}
        this.$a-{field.name} = data.$a-{field.name};
        $a-{end if}
        $a-{if: field.type.class == "custom"}
        this.$a-{field.name} = new $a-{field.type.to}().parse(data.$a-{field.name}) as $a-{field.type.to};
        $a-{end if}
        $a-{if: field.type.class == "array"}
        this.$a-{field.name} = NetUtil.parseArray(data.$a-{field.name}$a-{if: field.type.customName != null}, $a-{field.type.customName}$a-{end if});
        $a-{end if}
        $a-{if: field.type.class == "map"}
        this.$a-{field.name} = NetUtil.parseMap(data.$a-{field.name}$a-{if: field.type.customName != null}, $a-{field.type.customName}$a-{end if});
        $a-{end if}
        $a-{end for}

        return data;
    }

    public pack(): any
    {
        return {
            $a-{for: field in fields}
            $a-{field.name}: $a-{}
            $a-{if: field.type.class == "basic"}this.$a-{field.name}$a-{end if}
            $a-{if: field.type.class == "custom"}this.$a-{field.name}.pack()$a-{end if}
            $a-{if: field.type.class == "array"}NetUtil.packArray(this.$a-{field.name})$a-{end if}
            $a-{if: field.type.class == "map"}NetUtil.packMap(this.$a-{field.name})$a-{end if}
            $a-{if: $index < fields.length},
            $a-{end if}
            $a-{end for}
        };
    }
}

/** 注册返回体 */
netManager.registerResponse($a-{name}Response);
