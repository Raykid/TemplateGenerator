import RequestData, { IRequestParams } from "olympus-r/engine/net/RequestData";
import IRequestPolicy from "olympus-r/engine/net/IRequestPolicy";
import { trimData } from "olympus-r/utils/ObjectUtil";
import policy from "olympus-r/engine/net/policies/HTTPRequestPolicy";
import CareerWorkIndexResponse from "../response/CareerWorkIndexResponse";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 工作首页
*/
export default class CareerWorkIndexRequest extends RequestData
{
    /**
     * 职业Id
     * 
     * @type {string}
     * @memberof CareerWorkIndexRequest
     */
    public careerId: string;

    private ___params: IRequestParams = {
        type: "CareerWorkIndex",
        path: "/studentMobile/growingworld/dreamcareer/careerworkindex.vpage",
        protocol: "http",
        method: "POST",
        response: CareerWorkIndexResponse,
        headerDict: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {},
    };
    public get __params(): IRequestParams
    {
		let data:any = {};
        data.careerId = this.careerId; // string - 职业Id
        trimData(data);
		// java后端希望使用data字段保存JSON字符串来传递参数
		this.___params.data.data = JSON.stringify(data);

        return this.___params;
    }
    public __policy: IRequestPolicy = policy;
}
