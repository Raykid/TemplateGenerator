import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 建筑等级细节表
*/
export default class BuildingDetail extends DataType
{
    /**
     * 唯一描述
     * 
     * @type {string}
     * @memberof BuildingDetail
     */
    public id: string;

    /**
     * 环境描述
     * 
     * @type {string}
     * @memberof BuildingDetail
     */
    public mode: string;

    /**
     * 是否上下线
     * 
     * @type {string}
     * @memberof BuildingDetail
     */
    public status: string;

    /**
     * 建筑类型
     * 
     * @type {string}
     * @memberof BuildingDetail
     */
    public type: string;

    /**
     * 建筑等级
     * 
     * @type {number}
     * @memberof BuildingDetail
     */
    public level: number;

    /**
     * 升级需要的经验值
     * 
     * @type {number}
     * @memberof BuildingDetail
     */
    public experience: number;

    /**
     * 建筑名称
     * 
     * @type {string}
     * @memberof BuildingDetail
     */
    public name: string;

    /**
     * 建筑描述
     * 
     * @type {string}
     * @memberof BuildingDetail
     */
    public desc: string;

    /**
     * 建筑图片
     * 
     * @type {string}
     * @memberof BuildingDetail
     */
    public img: string;

    /**
     * 是否是顶级
     * 
     * @type {boolean}
     * @memberof BuildingDetail
     */
    public top: boolean;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.id = data.id;
        this.mode = data.mode;
        this.status = data.status;
        this.type = data.type;
        this.level = data.level;
        this.experience = data.experience;
        this.name = data.name;
        this.desc = data.desc;
        this.img = data.img;
        this.top = data.top;

        return data;
    }

    public pack(): any
    {
        return {
            id: this.id,
            mode: this.mode,
            status: this.status,
            type: this.type,
            level: this.level,
            experience: this.experience,
            name: this.name,
            desc: this.desc,
            img: this.img,
            top: this.top,
        };
    }
}
