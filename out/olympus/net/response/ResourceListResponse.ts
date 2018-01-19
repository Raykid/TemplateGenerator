import ResponseData, { IResponseParams } from "olympus-r/engine/net/ResponseData";
import { netManager } from "olympus-r/engine/net/NetManager";
import * as NetUtil from "olympus-r/engine/net/NetUtil";
import PropInfo from "../type/PropInfo";
import Career from "../type/Career";
import CareerDetail from "../type/CareerDetail";
import CareerWork from "../type/CareerWork";
import CareerWorkCondition from "../type/CareerWorkCondition";
import DreamCareerReward from "../type/DreamCareerReward";
import CommunityDetail from "../type/CommunityDetail";
import BuildingDetail from "../type/BuildingDetail";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 获取数据列表
*/
export default class ResourceListResponse extends ResponseData
{
    /**
     * 返回值时表示是否成功
     * 
     * @type {boolean}
     * @memberof ResourceListResponse
     */
    public success: boolean;

    /**
     * success是false时表示错误码
     * 
     * @type {number}
     * @memberof ResourceListResponse
     */
    public errorCode: number;

    /**
     * success是false时表示错误信息
     * 
     * @type {string}
     * @memberof ResourceListResponse
     */
    public info: string;

    /**
     * 当前的服务器时间戳（毫秒）
     * 
     * @type {string}
     * @memberof ResourceListResponse
     */
    public currentTime: string;

    /**
     * 版本信息集合
     * 
     * @type {{[key:string]:string}}
     * @memberof ResourceListResponse
     */
    public versions: {[key:string]:string} = {};

    /**
     * 道具表
     * 
     * @type {PropInfo[]}
     * @memberof ResourceListResponse
     */
    public propInfoList: PropInfo[] = [];

    /**
     * 工作表
     * 
     * @type {Career[]}
     * @memberof ResourceListResponse
     */
    public careerList: Career[] = [];

    /**
     * 职业等级细节表
     * 
     * @type {CareerDetail[]}
     * @memberof ResourceListResponse
     */
    public careerDetailList: CareerDetail[] = [];

    /**
     * 工作表
     * 
     * @type {CareerWork[]}
     * @memberof ResourceListResponse
     */
    public careerWorkList: CareerWork[] = [];

    /**
     * 工作条件表
     * 
     * @type {CareerWorkCondition[]}
     * @memberof ResourceListResponse
     */
    public careerWorkConditionList: CareerWorkCondition[] = [];

    /**
     * 奖励表
     * 
     * @type {DreamCareerReward[]}
     * @memberof ResourceListResponse
     */
    public dreamCareerRewardList: DreamCareerReward[] = [];

    /**
     * 社区等级细节表
     * 
     * @type {CommunityDetail[]}
     * @memberof ResourceListResponse
     */
    public communityDetailList: CommunityDetail[] = [];

    /**
     * 建筑等级细节表
     * 
     * @type {BuildingDetail[]}
     * @memberof ResourceListResponse
     */
    public buildingDetailList: BuildingDetail[] = [];

    public __params: IResponseParams = { type: "ResourceList" };

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

    public static type: string = "ResourceList";

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
        this.versions = NetUtil.parseMap(data.versions);
        this.propInfoList = NetUtil.parseArray(data.propInfoList, PropInfo);
        this.careerList = NetUtil.parseArray(data.careerList, Career);
        this.careerDetailList = NetUtil.parseArray(data.careerDetailList, CareerDetail);
        this.careerWorkList = NetUtil.parseArray(data.careerWorkList, CareerWork);
        this.careerWorkConditionList = NetUtil.parseArray(data.careerWorkConditionList, CareerWorkCondition);
        this.dreamCareerRewardList = NetUtil.parseArray(data.dreamCareerRewardList, DreamCareerReward);
        this.communityDetailList = NetUtil.parseArray(data.communityDetailList, CommunityDetail);
        this.buildingDetailList = NetUtil.parseArray(data.buildingDetailList, BuildingDetail);

        return data;
    }

    public pack(): any
    {
        return {
            success: this.success,
            errorCode: this.errorCode,
            info: this.info,
            currentTime: this.currentTime,
            versions: NetUtil.packMap(this.versions),
            propInfoList: NetUtil.packArray(this.propInfoList),
            careerList: NetUtil.packArray(this.careerList),
            careerDetailList: NetUtil.packArray(this.careerDetailList),
            careerWorkList: NetUtil.packArray(this.careerWorkList),
            careerWorkConditionList: NetUtil.packArray(this.careerWorkConditionList),
            dreamCareerRewardList: NetUtil.packArray(this.dreamCareerRewardList),
            communityDetailList: NetUtil.packArray(this.communityDetailList),
            buildingDetailList: NetUtil.packArray(this.buildingDetailList),
        };
    }
}

/** 注册返回体 */
netManager.registerResponse(ResourceListResponse);
