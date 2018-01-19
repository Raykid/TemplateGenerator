import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 奖励表
*/
export default class DreamCareerReward extends DataType
{
    /**
     * 唯一描述
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public id: string;

    /**
     * 环境描述
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public mode: string;

    /**
     * 是否上下线
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public status: string;

    /**
     * 奖励类别
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public category: string;

    /**
     * 工作id
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public careerWorkId: string;

    /**
     * 奖励类型
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public rewardType: string;

    /**
     * 奖励道具id
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public rewardPropId: string;

    /**
     * 奖励经验
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public rewardExp: string;

    /**
     * 奖励道具id
     * 
     * @type {string}
     * @memberof DreamCareerReward
     */
    public rewardPropNum: string;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.id = data.id;
        this.mode = data.mode;
        this.status = data.status;
        this.category = data.category;
        this.careerWorkId = data.careerWorkId;
        this.rewardType = data.rewardType;
        this.rewardPropId = data.rewardPropId;
        this.rewardExp = data.rewardExp;
        this.rewardPropNum = data.rewardPropNum;

        return data;
    }

    public pack(): any
    {
        return {
            id: this.id,
            mode: this.mode,
            status: this.status,
            category: this.category,
            careerWorkId: this.careerWorkId,
            rewardType: this.rewardType,
            rewardPropId: this.rewardPropId,
            rewardExp: this.rewardExp,
            rewardPropNum: this.rewardPropNum,
        };
    }
}
