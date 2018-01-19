import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * ClazzCommunityVO
*/
export default class ClazzCommunityVO extends DataType
{
    /**
     * 城市等级
     * 
     * @type {number}
     * @memberof ClazzCommunityVO
     */
    public level: number;

    /**
     * 城市经验值
     * 
     * @type {number}
     * @memberof ClazzCommunityVO
     */
    public experience: number;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.level = data.level;
        this.experience = data.experience;

        return data;
    }

    public pack(): any
    {
        return {
            level: this.level,
            experience: this.experience,
        };
    }
}
