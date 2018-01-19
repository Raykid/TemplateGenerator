import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 工作表
*/
export default class Career extends DataType
{
    /**
     * 唯一描述
     * 
     * @type {string}
     * @memberof Career
     */
    public id: string;

    /**
     * 环境描述
     * 
     * @type {string}
     * @memberof Career
     */
    public mode: string;

    /**
     * 是否上下线
     * 
     * @type {string}
     * @memberof Career
     */
    public status: string;

    /**
     * 职业名称
     * 
     * @type {string}
     * @memberof Career
     */
    public name: string;

    /**
     * 职业描述
     * 
     * @type {string}
     * @memberof Career
     */
    public desc: string;

    /**
     * 职业类型
     * 
     * @type {string}
     * @memberof Career
     */
    public careerType: string;

    /**
     * 建筑类型
     * 
     * @type {string}
     * @memberof Career
     */
    public buildingType: string;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.id = data.id;
        this.mode = data.mode;
        this.status = data.status;
        this.name = data.name;
        this.desc = data.desc;
        this.careerType = data.careerType;
        this.buildingType = data.buildingType;

        return data;
    }

    public pack(): any
    {
        return {
            id: this.id,
            mode: this.mode,
            status: this.status,
            name: this.name,
            desc: this.desc,
            careerType: this.careerType,
            buildingType: this.buildingType,
        };
    }
}
