import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 奖励信息
*/
export default class WonderlandRewardInfo extends DataType
{
    /**
     * 奖励类型
     * 
     * @type {string}
     * @memberof WonderlandRewardInfo
     */
    public type: string;

    /**
     * 奖励标识
     * 
     * @type {string}
     * @memberof WonderlandRewardInfo
     */
    public identity: string;

    /**
     * 奖励名称
     * 
     * @type {string}
     * @memberof WonderlandRewardInfo
     */
    public name: string;

    /**
     * 奖励单位
     * 
     * @type {string}
     * @memberof WonderlandRewardInfo
     */
    public unit: string;

    /**
     * 奖励小图标
     * 
     * @type {string}
     * @memberof WonderlandRewardInfo
     */
    public icon: string;

    /**
     * 奖励大图标
     * 
     * @type {string}
     * @memberof WonderlandRewardInfo
     */
    public img: string;

    /**
     * 奖励描述
     * 
     * @type {string}
     * @memberof WonderlandRewardInfo
     */
    public desc: string;

    /**
     * 数量
     * 
     * @type {string}
     * @memberof WonderlandRewardInfo
     */
    public quantity: string;

    /**
     * 概率
     * 
     * @type {number}
     * @memberof WonderlandRewardInfo
     */
    public probability: number;

    /**
     * 是否禁止加倍
     * 
     * @type {boolean}
     * @memberof WonderlandRewardInfo
     */
    public multiplyForbidden: boolean;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.type = data.type;
        this.identity = data.identity;
        this.name = data.name;
        this.unit = data.unit;
        this.icon = data.icon;
        this.img = data.img;
        this.desc = data.desc;
        this.quantity = data.quantity;
        this.probability = data.probability;
        this.multiplyForbidden = data.multiplyForbidden;

        return data;
    }

    public pack(): any
    {
        return {
            type: this.type,
            identity: this.identity,
            name: this.name,
            unit: this.unit,
            icon: this.icon,
            img: this.img,
            desc: this.desc,
            quantity: this.quantity,
            probability: this.probability,
            multiplyForbidden: this.multiplyForbidden,
        };
    }
}
