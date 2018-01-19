import ResponseData, { IResponseParams } from "olympus-r/engine/net/ResponseData";
import { netManager } from "olympus-r/engine/net/NetManager";
import * as NetUtil from "olympus-r/engine/net/NetUtil";
import ClazzCommunityVO from "../type/ClazzCommunityVO";
import ClazzGoalVO from "../type/ClazzGoalVO";
import OfficeBuildingVO from "../type/OfficeBuildingVO";
import ClazzGoalPopupVO from "../type/ClazzGoalPopupVO";
import OfficeBuildingUpgradedPopupVO from "../type/OfficeBuildingUpgradedPopupVO";
import ClazzCommunityUpgradedPopupVO from "../type/ClazzCommunityUpgradedPopupVO";
import SuperiorRewardPopupVO from "../type/SuperiorRewardPopupVO";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 社区首页
*/
export default class CommunityIndexResponse extends ResponseData
{
    /**
     * 返回值时表示是否成功
     * 
     * @type {boolean}
     * @memberof CommunityIndexResponse
     */
    public success: boolean;

    /**
     * success是false时表示错误码
     * 
     * @type {number}
     * @memberof CommunityIndexResponse
     */
    public errorCode: number;

    /**
     * success是false时表示错误信息
     * 
     * @type {string}
     * @memberof CommunityIndexResponse
     */
    public info: string;

    /**
     * 当前的服务器时间戳（毫秒）
     * 
     * @type {string}
     * @memberof CommunityIndexResponse
     */
    public currentTime: string;

    /**
     * 城市信息
     * 
     * @type {ClazzCommunityVO}
     * @memberof CommunityIndexResponse
     */
    public communityInfo: ClazzCommunityVO;

    /**
     * 城市目标信息
     * 
     * @type {ClazzGoalVO}
     * @memberof CommunityIndexResponse
     */
    public goalInfo: ClazzGoalVO;

    /**
     * 市长名字，空字符串如果没有市长
     * 
     * @type {string}
     * @memberof CommunityIndexResponse
     */
    public mayer: string;

    /**
     * 建筑物列表
     * 
     * @type {OfficeBuildingVO[]}
     * @memberof CommunityIndexResponse
     */
    public buildings: OfficeBuildingVO[] = [];

    /**
     * 城市目标弹窗，如果为null不弹
     * 
     * @type {ClazzGoalPopupVO}
     * @memberof CommunityIndexResponse
     */
    public cgPopup: ClazzGoalPopupVO;

    /**
     * 建筑物升级提醒弹窗，如果为null或者列表为空不弹
     * 
     * @type {OfficeBuildingUpgradedPopupVO[]}
     * @memberof CommunityIndexResponse
     */
    public obuPopup: OfficeBuildingUpgradedPopupVO[] = [];

    /**
     * 城市升级提醒弹窗，如果为null不弹
     * 
     * @type {ClazzCommunityUpgradedPopupVO}
     * @memberof CommunityIndexResponse
     */
    public ccuPopup: ClazzCommunityUpgradedPopupVO;

    /**
     * 上级奖励弹窗，如果为null不弹
     * 
     * @type {SuperiorRewardPopupVO}
     * @memberof CommunityIndexResponse
     */
    public srPopup: SuperiorRewardPopupVO;

    public __params: IResponseParams = { type: "CommunityIndex" };

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

    public static type: string = "CommunityIndex";

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
        this.communityInfo = new ClazzCommunityVO().parse(data.communityInfo) as ClazzCommunityVO;
        this.goalInfo = new ClazzGoalVO().parse(data.goalInfo) as ClazzGoalVO;
        this.mayer = data.mayer;
        this.buildings = NetUtil.parseArray(data.buildings, OfficeBuildingVO);
        this.cgPopup = new ClazzGoalPopupVO().parse(data.cgPopup) as ClazzGoalPopupVO;
        this.obuPopup = NetUtil.parseArray(data.obuPopup, OfficeBuildingUpgradedPopupVO);
        this.ccuPopup = new ClazzCommunityUpgradedPopupVO().parse(data.ccuPopup) as ClazzCommunityUpgradedPopupVO;
        this.srPopup = new SuperiorRewardPopupVO().parse(data.srPopup) as SuperiorRewardPopupVO;

        return data;
    }

    public pack(): any
    {
        return {
            success: this.success,
            errorCode: this.errorCode,
            info: this.info,
            currentTime: this.currentTime,
            communityInfo: this.communityInfo.pack(),
            goalInfo: this.goalInfo.pack(),
            mayer: this.mayer,
            buildings: NetUtil.packArray(this.buildings),
            cgPopup: this.cgPopup.pack(),
            obuPopup: NetUtil.packArray(this.obuPopup),
            ccuPopup: this.ccuPopup.pack(),
            srPopup: this.srPopup.pack(),
        };
    }
}

/** 注册返回体 */
netManager.registerResponse(CommunityIndexResponse);
