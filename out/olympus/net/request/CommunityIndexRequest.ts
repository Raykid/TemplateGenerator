import RequestData, { IRequestParams } from "olympus-r/engine/net/RequestData";
import IRequestPolicy from "olympus-r/engine/net/IRequestPolicy";
import { trimData } from "olympus-r/utils/ObjectUtil";
import policy from "olympus-r/engine/net/policies/HTTPRequestPolicy";
import CommunityIndexResponse from "../response/CommunityIndexResponse";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 社区首页
*/
export default class CommunityIndexRequest extends RequestData
{
    private ___params: IRequestParams = {
        type: "CommunityIndex",
        path: "/studentMobile/growingworld/dreamcareer/communityindex.vpage",
        protocol: "http",
        method: "POST",
        response: CommunityIndexResponse,
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
