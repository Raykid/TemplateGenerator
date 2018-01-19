import RequestData, { IRequestParams } from "olympus-r/engine/net/RequestData";
import IRequestPolicy from "olympus-r/engine/net/IRequestPolicy";
import { trimData } from "olympus-r/utils/ObjectUtil";
import policy from "olympus-r/engine/net/policies/HTTPRequestPolicy";
import ResourceVersionResponse from "../response/ResourceVersionResponse";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 获取配置表版本
*/
export default class ResourceVersionRequest extends RequestData
{
    /**
     * 请求数据表列表
     * 
     * @type {string[]}
     * @memberof ResourceVersionRequest
     */
    public tableNames: string[] = [];

    private ___params: IRequestParams = {
        type: "ResourceVersion",
        path: "/studentMobile/growingworld/config/resourceversion.vpage",
        protocol: "http",
        method: "POST",
        response: ResourceVersionResponse,
        headerDict: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {},
    };
    public get __params(): IRequestParams
    {
		let data:any = {};
        data.tableNames = this.tableNames; // string[] - 请求数据表列表
        trimData(data);
		// java后端希望使用data字段保存JSON字符串来传递参数
		this.___params.data.data = JSON.stringify(data);

        return this.___params;
    }
    public __policy: IRequestPolicy = policy;
}
