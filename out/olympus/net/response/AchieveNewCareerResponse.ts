import ResponseData, { IResponseParams } from "olympus-r/engine/net/ResponseData";
import { netManager } from "olympus-r/engine/net/NetManager";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 获得新职业
*/
export default class AchieveNewCareerResponse extends ResponseData
{
    /**
     * 返回值时表示是否成功
     * 
     * @type {boolean}
     * @memberof AchieveNewCareerResponse
     */
    public success: boolean;

    /**
     * success是false时表示错误码
     * 
     * @type {number}
     * @memberof AchieveNewCareerResponse
     */
    public errorCode: number;

    /**
     * success是false时表示错误信息
     * 
     * @type {string}
     * @memberof AchieveNewCareerResponse
     */
    public info: string;

    /**
     * 当前的服务器时间戳（毫秒）
     * 
     * @type {string}
     * @memberof AchieveNewCareerResponse
     */
    public currentTime: string;

    public __params: IResponseParams = { type: "AchieveNewCareer" };

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

    public static type: string = "AchieveNewCareer";

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

        return data;
    }

    public pack(): any
    {
        return {
            success: this.success,
            errorCode: this.errorCode,
            info: this.info,
            currentTime: this.currentTime,
        };
    }
}

/** 注册返回体 */
netManager.registerResponse(AchieveNewCareerResponse);
