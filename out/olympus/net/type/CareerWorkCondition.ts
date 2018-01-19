import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 工作条件表
*/
export default class CareerWorkCondition extends DataType
{
    /**
     * 唯一描述
     * 
     * @type {string}
     * @memberof CareerWorkCondition
     */
    public id: string;

    /**
     * 环境描述
     * 
     * @type {string}
     * @memberof CareerWorkCondition
     */
    public mode: string;

    /**
     * 是否上下线
     * 
     * @type {string}
     * @memberof CareerWorkCondition
     */
    public status: string;

    /**
     * 工作id
     * 
     * @type {string}
     * @memberof CareerWorkCondition
     */
    public careerWorkId: string;

    /**
     * 需要职业等级
     * 
     * @type {number}
     * @memberof CareerWorkCondition
     */
    public requireCareerLevel: number;

    /**
     * 可以完成次数
     * 
     * @type {number}
     * @memberof CareerWorkCondition
     */
    public completeTimes: number;

    /**
     * 限制类型
     * 
     * @type {string}
     * @memberof CareerWorkCondition
     */
    public timesLimitType: string;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.id = data.id;
        this.mode = data.mode;
        this.status = data.status;
        this.careerWorkId = data.careerWorkId;
        this.requireCareerLevel = data.requireCareerLevel;
        this.completeTimes = data.completeTimes;
        this.timesLimitType = data.timesLimitType;

        return data;
    }

    public pack(): any
    {
        return {
            id: this.id,
            mode: this.mode,
            status: this.status,
            careerWorkId: this.careerWorkId,
            requireCareerLevel: this.requireCareerLevel,
            completeTimes: this.completeTimes,
            timesLimitType: this.timesLimitType,
        };
    }
}
