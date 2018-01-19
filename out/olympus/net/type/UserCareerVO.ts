import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * UserCareerVO
*/
export default class UserCareerVO extends DataType
{
    /**
     * 当前职业等级
     * 
     * @type {number}
     * @memberof UserCareerVO
     */
    public level: number;

    /**
     * 当前职业详细等级id
     * 
     * @type {string}
     * @memberof UserCareerVO
     */
    public careerDetailId: string;

    /**
     * 职业id
     * 
     * @type {string}
     * @memberof UserCareerVO
     */
    public careerId: string;

    /**
     * 用户当前皮肤
     * 
     * @type {string}
     * @memberof UserCareerVO
     */
    public skinType: string;

    /**
     * 是否主职业
     * 
     * @type {boolean}
     * @memberof UserCareerVO
     */
    public major: boolean;

    /**
     * 已经学习绘本数量
     * 
     * @type {number}
     * @memberof UserCareerVO
     */
    public learnPictureNum: number;

    /**
     * 已经获得经验值
     * 
     * @type {string}
     * @memberof UserCareerVO
     */
    public achieveExp: string;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.level = data.level;
        this.careerDetailId = data.careerDetailId;
        this.careerId = data.careerId;
        this.skinType = data.skinType;
        this.major = data.major;
        this.learnPictureNum = data.learnPictureNum;
        this.achieveExp = data.achieveExp;

        return data;
    }

    public pack(): any
    {
        return {
            level: this.level,
            careerDetailId: this.careerDetailId,
            careerId: this.careerId,
            skinType: this.skinType,
            major: this.major,
            learnPictureNum: this.learnPictureNum,
            achieveExp: this.achieveExp,
        };
    }
}
