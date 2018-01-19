import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";
import WonderlandRewardInfo from "../type/WonderlandRewardInfo";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * SuperiorRewardPopupVO
*/
export default class SuperiorRewardPopupVO extends DataType
{
    /**
     * 职业
     * 
     * @type {string}
     * @memberof SuperiorRewardPopupVO
     */
    public career: string;

    /**
     * 上级姓名
     * 
     * @type {string}
     * @memberof SuperiorRewardPopupVO
     */
    public name: string;

    /**
     * 奖励信息
     * 
     * @type {WonderlandRewardInfo[]}
     * @memberof SuperiorRewardPopupVO
     */
    public rewards: WonderlandRewardInfo[] = [];

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.career = data.career;
        this.name = data.name;
        this.rewards = NetUtil.parseArray(data.rewards, WonderlandRewardInfo);

        return data;
    }

    public pack(): any
    {
        return {
            career: this.career,
            name: this.name,
            rewards: NetUtil.packArray(this.rewards),
        };
    }
}
