import RequestData, { IRequestParams } from "olympus-r/engine/net/RequestData";
import IRequestPolicy from "olympus-r/engine/net/IRequestPolicy";
import { trimData } from "olympus-r/utils/ObjectUtil";
import policy from "olympus-r/engine/net/policies/HTTPRequestPolicy";
import ResourceListResponse from "../response/ResourceListResponse";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 获取数据列表
*/
export default class ResourceListRequest extends RequestData
{
    /**
     * 请求数据表列表
     * 
     * @type {string[]}
     * @memberof ResourceListRequest
     */
    public tableNames: string[] = [];

    private ___params: IRequestParams = {
        type: "ResourceList",
        path: "/studentMobile/growingworld/config/resourcelist.vpage",
        protocol: "http",
        method: "POST",
        response: ResourceListResponse,
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
