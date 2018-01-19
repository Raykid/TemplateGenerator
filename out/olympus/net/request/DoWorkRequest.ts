import RequestData, { IRequestParams } from "olympus-r/engine/net/RequestData";
import IRequestPolicy from "olympus-r/engine/net/IRequestPolicy";
import { trimData } from "olympus-r/utils/ObjectUtil";
import policy from "olympus-r/engine/net/policies/HTTPRequestPolicy";
import DoWorkResponse from "../response/DoWorkResponse";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 完成工作
*/
export default class DoWorkRequest extends RequestData
{
    /**
     * 完成次数
     * 
     * @type {number}
     * @memberof DoWorkRequest
     */
    public completeTimes: number;

    /**
     * 工作id
     * 
     * @type {string}
     * @memberof DoWorkRequest
     */
    public careerWorkId: string;

    private ___params: IRequestParams = {
        type: "DoWork",
        path: "/studentMobile/growingworld/dreamcareer/dowork.vpage",
        protocol: "http",
        method: "POST",
        response: DoWorkResponse,
        headerDict: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {},
    };
    public get __params(): IRequestParams
    {
		let data:any = {};
        data.completeTimes = this.completeTimes; // number - 完成次数
        data.careerWorkId = this.careerWorkId; // string - 工作id
        trimData(data);
		// java后端希望使用data字段保存JSON字符串来传递参数
		this.___params.data.data = JSON.stringify(data);

        return this.___params;
    }
    public __policy: IRequestPolicy = policy;
}
