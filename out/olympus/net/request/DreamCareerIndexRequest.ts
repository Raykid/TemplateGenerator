import RequestData, { IRequestParams } from "olympus-r/engine/net/RequestData";
import IRequestPolicy from "olympus-r/engine/net/IRequestPolicy";
import { trimData } from "olympus-r/utils/ObjectUtil";
import policy from "olympus-r/engine/net/policies/HTTPRequestPolicy";
import DreamCareerIndexResponse from "../response/DreamCareerIndexResponse";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 梦想职业首页
*/
export default class DreamCareerIndexRequest extends RequestData
{
    private ___params: IRequestParams = {
        type: "DreamCareerIndex",
        path: "/studentMobile/growingworld/dreamcareer/index.vpage",
        protocol: "http",
        method: "POST",
        response: DreamCareerIndexResponse,
        headerDict: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {},
    };
    public get __params(): IRequestParams
    {
		let data:any = {};
        trimData(data);
		// java后端希望使用data字段保存JSON字符串来传递参数
		this.___params.data.data = JSON.stringify(data);

        return this.___params;
    }
    public __policy: IRequestPolicy = policy;
}
