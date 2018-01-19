import RequestData, { IRequestParams } from "olympus-r/engine/net/RequestData";
import IRequestPolicy from "olympus-r/engine/net/IRequestPolicy";
import { trimData } from "olympus-r/utils/ObjectUtil";
$a-{if: protocol == "http"}
import policy from "olympus-r/engine/net/policies/HTTPRequestPolicy";
$a-{end if}
$a-{if: response != null}
import $a-{response.name}Response from "../response/$a-{response.name}Response";
$a-{end if}
$a-{for: name in getCustomNames(fields)}
import $a-{name} from "../type/$a-{name}";
$a-{end for}

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * $a-{comment}
*/
export default class $a-{name}Request extends RequestData
{
    $a-{for: field in fields}
    /**
     * $a-{field.comment}
     * 
     * @type {$a-{field.type.to}}
     * @memberof $a-{name}Request
     */
    $a-{if: field.type.class == "basic"}
    public $a-{field.name}: $a-{field.type.to};
    $a-{end if}
    $a-{if: field.type.class == "custom"}
    public $a-{field.name}: $a-{field.type.to} = new $a-{field.type.to}();
    $a-{end if}
    $a-{if: field.type.class == "array"}
    public $a-{field.name}: $a-{field.type.to} = [];
    $a-{end if}
    $a-{if: field.type.class == "map"}
    public $a-{field.name}: $a-{field.type.to} = {};
    $a-{end if}

    $a-{end for}
    private ___params: IRequestParams = {
        type: "$a-{name}",
        path: "$a-{url}",
        protocol: "$a-{protocol}",
        method: "$a-{method}",
        $a-{if: response != null}
        response: $a-{response.name}Response,
        $a-{end if}
        headerDict: {
            "Content-Type": "$a-{contentType}",
        },
        data: {},
    };
    public get __params(): IRequestParams
    {
		let data:any = {};
        $a-{for: field in fields}
        data.$a-{field.name} = this.$a-{field.name}; // $a-{field.type.to} - $a-{field.comment}
        $a-{end for}
        trimData(data);
		// java后端希望使用data字段保存JSON字符串来传递参数
		this.___params.data.data = JSON.stringify(data);

        return this.___params;
    }
    public __policy: IRequestPolicy = policy;
}
