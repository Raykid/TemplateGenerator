import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * ClazzGoalVO
*/
export default class ClazzGoalVO extends DataType
{
    /**
     * 目标完成次数
     * 
     * @type {number}
     * @memberof ClazzGoalVO
     */
    public goal: number;

    /**
     * 已经完成次数
     * 
     * @type {number}
     * @memberof ClazzGoalVO
     */
    public accomplishment: number;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.goal = data.goal;
        this.accomplishment = data.accomplishment;

        return data;
    }

    public pack(): any
    {
        return {
            goal: this.goal,
            accomplishment: this.accomplishment,
        };
    }
}
