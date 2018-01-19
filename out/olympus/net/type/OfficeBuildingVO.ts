import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 建筑物列表
*/
export default class OfficeBuildingVO extends DataType
{
    /**
     * 建筑物类型
     * 
     * @type {string}
     * @memberof OfficeBuildingVO
     */
    public type: string;

    /**
     * 建筑物等级
     * 
     * @type {number}
     * @memberof OfficeBuildingVO
     */
    public level: number;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.type = data.type;
        this.level = data.level;

        return data;
    }

    public pack(): any
    {
        return {
            type: this.type,
            level: this.level,
        };
    }
}
