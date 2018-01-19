import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 道具表
*/
export default class PropInfo extends DataType
{
    /**
     * 索引id
     * 
     * @type {string}
     * @memberof PropInfo
     */
    public id: string;

    /**
     * 类型
     * 
     * @type {string}
     * @memberof PropInfo
     */
    public propType: string;

    /**
     * 名称
     * 
     * @type {string}
     * @memberof PropInfo
     */
    public name: string;

    /**
     * 描述
     * 
     * @type {string}
     * @memberof PropInfo
     */
    public desc: string;

    /**
     * 图标
     * 
     * @type {string}
     * @memberof PropInfo
     */
    public icon: string;

    /**
     * 关联id
     * 
     * @type {string}
     * @memberof PropInfo
     */
    public targetId: string;

    /**
     * 目标数量
     * 
     * @type {number}
     * @memberof PropInfo
     */
    public targetNumber: number;

    /**
     * 导流跳转地址
     * 
     * @type {string}
     * @memberof PropInfo
     */
    public guidanceType: string;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.id = data.id;
        this.propType = data.propType;
        this.name = data.name;
        this.desc = data.desc;
        this.icon = data.icon;
        this.targetId = data.targetId;
        this.targetNumber = data.targetNumber;
        this.guidanceType = data.guidanceType;

        return data;
    }

    public pack(): any
    {
        return {
            id: this.id,
            propType: this.propType,
            name: this.name,
            desc: this.desc,
            icon: this.icon,
            targetId: this.targetId,
            targetNumber: this.targetNumber,
            guidanceType: this.guidanceType,
        };
    }
}
