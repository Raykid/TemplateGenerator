import ResponseData, { IResponseParams } from "olympus-r/engine/net/ResponseData";
import { netManager } from "olympus-r/engine/net/NetManager";
import * as NetUtil from "olympus-r/engine/net/NetUtil";
import UserCareerVO from "../type/UserCareerVO";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 梦想职业首页
*/
export default class DreamCareerIndexResponse extends ResponseData
{
    /**
     * 返回值时表示是否成功
     * 
     * @type {boolean}
     * @memberof DreamCareerIndexResponse
     */
    public success: boolean;

    /**
     * success是false时表示错误码
     * 
     * @type {number}
     * @memberof DreamCareerIndexResponse
     */
    public errorCode: number;

    /**
     * success是false时表示错误信息
     * 
     * @type {string}
     * @memberof DreamCareerIndexResponse
     */
    public info: string;

    /**
     * 当前的服务器时间戳（毫秒）
     * 
     * @type {string}
     * @memberof DreamCareerIndexResponse
     */
    public currentTime: string;

    /**
     * 用户当前职业信息,为空表示不存在
     * 
     * @type {UserCareerVO}
     * @memberof DreamCareerIndexResponse
     */
    public userCareer: UserCareerVO;

    /**
     * 是否有宝箱
     * 
     * @type {boolean}
     * @memberof DreamCareerIndexResponse
     */
    public haveBox: boolean;

    /**
     * 是否有可以升级
     * 
     * @type {boolean}
     * @memberof DreamCareerIndexResponse
     */
    public upgrade: boolean;

    /**
     * 用户拥有职业列表
     * 
     * @type {UserCareerVO[]}
     * @memberof DreamCareerIndexResponse
     */
    public achieveCareerList: UserCareerVO[] = [];

    /**
     * 本周经验值
     * 
     * @type {number}
     * @memberof DreamCareerIndexResponse
     */
    public weekExp: number;

    /**
     * 本周建设值
     * 
     * @type {number}
     * @memberof DreamCareerIndexResponse
     */
    public weekBuildingExp: number;

    /**
     * 用户精灵性别
     * 
     * @type {string}
     * @memberof DreamCareerIndexResponse
     */
    public fairyType: string;

    public __params: IResponseParams = { type: "DreamCareerIndex" };

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

    public static type: string = "DreamCareerIndex";

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
        this.userCareer = new UserCareerVO().parse(data.userCareer) as UserCareerVO;
        this.haveBox = data.haveBox;
        this.upgrade = data.upgrade;
        this.achieveCareerList = NetUtil.parseArray(data.achieveCareerList, UserCareerVO);
        this.weekExp = data.weekExp;
        this.weekBuildingExp = data.weekBuildingExp;
        this.fairyType = data.fairyType;

        return data;
    }

    public pack(): any
    {
        return {
            success: this.success,
            errorCode: this.errorCode,
            info: this.info,
            currentTime: this.currentTime,
            userCareer: this.userCareer.pack(),
            haveBox: this.haveBox,
            upgrade: this.upgrade,
            achieveCareerList: NetUtil.packArray(this.achieveCareerList),
            weekExp: this.weekExp,
            weekBuildingExp: this.weekBuildingExp,
            fairyType: this.fairyType,
        };
    }
}

/** 注册返回体 */
netManager.registerResponse(DreamCareerIndexResponse);
