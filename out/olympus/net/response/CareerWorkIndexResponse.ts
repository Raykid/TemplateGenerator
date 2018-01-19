import ResponseData, { IResponseParams } from "olympus-r/engine/net/ResponseData";
import { netManager } from "olympus-r/engine/net/NetManager";
import * as NetUtil from "olympus-r/engine/net/NetUtil";
import CompleteWorkVO from "../type/CompleteWorkVO";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 工作首页
*/
export default class CareerWorkIndexResponse extends ResponseData
{
    /**
     * 返回值时表示是否成功
     * 
     * @type {boolean}
     * @memberof CareerWorkIndexResponse
     */
    public success: boolean;

    /**
     * success是false时表示错误码
     * 
     * @type {number}
     * @memberof CareerWorkIndexResponse
     */
    public errorCode: number;

    /**
     * success是false时表示错误信息
     * 
     * @type {string}
     * @memberof CareerWorkIndexResponse
     */
    public info: string;

    /**
     * 当前的服务器时间戳（毫秒）
     * 
     * @type {string}
     * @memberof CareerWorkIndexResponse
     */
    public currentTime: string;

    /**
     * 工作证道具id
     * 
     * @type {string}
     * @memberof CareerWorkIndexResponse
     */
    public workPropId: string;

    /**
     * 工作证数量
     * 
     * @type {number}
     * @memberof CareerWorkIndexResponse
     */
    public workPropNum: number;

    /**
     * 完成工作次数
     * 
     * @type {CompleteWorkVO[]}
     * @memberof CareerWorkIndexResponse
     */
    public completeWorkVOList: CompleteWorkVO[] = [];

    public __params: IResponseParams = { type: "CareerWorkIndex" };

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

    public static type: string = "CareerWorkIndex";

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
        this.success = data.success;
        this.errorCode = data.errorCode;
        this.info = data.info;
        this.currentTime = data.currentTime;
        this.workPropId = data.workPropId;
        this.workPropNum = data.workPropNum;
        this.completeWorkVOList = NetUtil.parseArray(data.completeWorkVOList, CompleteWorkVO);

        return data;
    }

    public pack(): any
    {
        return {
            success: this.success,
            errorCode: this.errorCode,
            info: this.info,
            currentTime: this.currentTime,
            workPropId: this.workPropId,
            workPropNum: this.workPropNum,
            completeWorkVOList: NetUtil.packArray(this.completeWorkVOList),
        };
    }
}

/** 注册返回体 */
netManager.registerResponse(CareerWorkIndexResponse);
