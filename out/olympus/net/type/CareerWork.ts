import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 工作表
*/
export default class CareerWork extends DataType
{
    /**
     * 唯一描述
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public id: string;

    /**
     * 环境描述
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public mode: string;

    /**
     * 是否上下线
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public status: string;

    /**
     * 所属职业
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public careerId: string;

    /**
     * 工作名称
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public name: string;

    /**
     * 工作描述
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public desc: string;

    /**
     * 工作图标
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public icon: string;

    /**
     * 工作内容题目id，随机一个
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public workDocIds: string;

    /**
     * 工作消耗道具id
     * 
     * @type {string}
     * @memberof CareerWork
     */
    public consumePropId: string;

    /**
     * 每次工作消耗道具数量
     * 
     * @type {number}
     * @memberof CareerWork
     */
    public consumePropNum: number;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.id = data.id;
        this.mode = data.mode;
        this.status = data.status;
        this.careerId = data.careerId;
        this.name = data.name;
        this.desc = data.desc;
        this.icon = data.icon;
        this.workDocIds = data.workDocIds;
        this.consumePropId = data.consumePropId;
        this.consumePropNum = data.consumePropNum;

        return data;
    }

    public pack(): any
    {
        return {
            id: this.id,
            mode: this.mode,
            status: this.status,
            careerId: this.careerId,
            name: this.name,
            desc: this.desc,
            icon: this.icon,
            workDocIds: this.workDocIds,
            consumePropId: this.consumePropId,
            consumePropNum: this.consumePropNum,
        };
    }
}
