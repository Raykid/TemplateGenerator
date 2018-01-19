import ResponseData, { IResponseParams } from "olympus-r/engine/net/ResponseData";
import { netManager } from "olympus-r/engine/net/NetManager";
import * as NetUtil from "olympus-r/engine/net/NetUtil";
import ResourceConfigVO from "../type/ResourceConfigVO";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 获取配置表版本
*/
export default class ResourceVersionResponse extends ResponseData
{
    /**
     * 返回值时表示是否成功
     * 
     * @type {boolean}
     * @memberof ResourceVersionResponse
     */
    public success: boolean;

    /**
     * success是false时表示错误码
     * 
     * @type {number}
     * @memberof ResourceVersionResponse
     */
    public errorCode: number;

    /**
     * success是false时表示错误信息
     * 
     * @type {string}
     * @memberof ResourceVersionResponse
     */
    public info: string;

    /**
     * 当前的服务器时间戳（毫秒）
     * 
     * @type {string}
     * @memberof ResourceVersionResponse
     */
    public currentTime: string;

    /**
     * 配置表版本信息
     * 
     * @type {ResourceConfigVO[]}
     * @memberof ResourceVersionResponse
     */
    public resourceConfigList: ResourceConfigVO[] = [];

    public __params: IResponseParams = { type: "ResourceVersion" };

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

    public static type: string = "ResourceVersion";

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
        this.resourceConfigList = NetUtil.parseArray(data.resourceConfigList, ResourceConfigVO);

        return data;
    }

    public pack(): any
    {
        return {
            success: this.success,
            errorCode: this.errorCode,
            info: this.info,
            currentTime: this.currentTime,
            resourceConfigList: NetUtil.packArray(this.resourceConfigList),
        };
    }
}

/** 注册返回体 */
netManager.registerResponse(ResourceVersionResponse);
