import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * ClazzGoalPopupVO
*/
export default class ClazzGoalPopupVO extends DataType
{
    /**
     * 上周城市目标是否完成
     * 
     * @type {boolean}
     * @memberof ClazzGoalPopupVO
     */
    public accomplished: boolean;

    /**
     * 完成城市目标的奖励，如果未完成显示0
     * 
     * @type {number}
     * @memberof ClazzGoalPopupVO
     */
    public bonus: number;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.accomplished = data.accomplished;
        this.bonus = data.bonus;

        return data;
    }

    public pack(): any
    {
        return {
            accomplished: this.accomplished,
            bonus: this.bonus,
        };
    }
}
