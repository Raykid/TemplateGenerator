import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * ClazzCommunityUpgradedPopupVO
*/
export default class ClazzCommunityUpgradedPopupVO extends DataType
{
    /**
     * 升级前等级
     * 
     * @type {number}
     * @memberof ClazzCommunityUpgradedPopupVO
     */
    public before: number;

    /**
     * 升级后等级
     * 
     * @type {number}
     * @memberof ClazzCommunityUpgradedPopupVO
     */
    public after: number;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.before = data.before;
        this.after = data.after;

        return data;
    }

    public pack(): any
    {
        return {
            before: this.before,
            after: this.after,
        };
    }
}
