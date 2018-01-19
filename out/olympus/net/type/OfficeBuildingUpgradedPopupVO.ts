import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 建筑物升级提醒弹窗，如果为null或者列表为空不弹
*/
export default class OfficeBuildingUpgradedPopupVO extends DataType
{
    /**
     * 升级前等级
     * 
     * @type {number}
     * @memberof OfficeBuildingUpgradedPopupVO
     */
    public before: number;

    /**
     * 升级后等级
     * 
     * @type {number}
     * @memberof OfficeBuildingUpgradedPopupVO
     */
    public after: number;

    /**
     * 升级的建筑物
     * 
     * @type {string}
     * @memberof OfficeBuildingUpgradedPopupVO
     */
    public building: string;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.before = data.before;
        this.after = data.after;
        this.building = data.building;

        return data;
    }

    public pack(): any
    {
        return {
            before: this.before,
            after: this.after,
            building: this.building,
        };
    }
}
