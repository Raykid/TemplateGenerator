import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 职业等级细节表
*/
export default class CareerDetail extends DataType
{
    /**
     * 唯一描述
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public id: string;

    /**
     * 环境描述
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public mode: string;

    /**
     * 是否上下线
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public status: string;

    /**
     * 职位名称
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public name: string;

    /**
     * 职业描述
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public desc: string;

    /**
     * 职业id
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public careerId: string;

    /**
     * 等级
     * 
     * @type {number}
     * @memberof CareerDetail
     */
    public level: number;

    /**
     * 男生职业绑定皮肤类型
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public boySkinType: string;

    /**
     * 女生职业绑定皮肤类型
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public girlSkinType: string;

    /**
     * 升级需要经验值
     * 
     * @type {number}
     * @memberof CareerDetail
     */
    public requireExp: number;

    /**
     * 学习绘本数量
     * 
     * @type {number}
     * @memberof CareerDetail
     */
    public requirePictureNum: number;

    /**
     * 考试题目列表，逗号隔开
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public examDocIds: string;

    /**
     * 每个等级绘本题目列表，逗号隔开
     * 
     * @type {string}
     * @memberof CareerDetail
     */
    public pictureDocIds: string;

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
        this.careerId = data.careerId;
        this.level = data.level;
        this.boySkinType = data.boySkinType;
        this.girlSkinType = data.girlSkinType;
        this.requireExp = data.requireExp;
        this.requirePictureNum = data.requirePictureNum;
        this.examDocIds = data.examDocIds;
        this.pictureDocIds = data.pictureDocIds;

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
            careerId: this.careerId,
            level: this.level,
            boySkinType: this.boySkinType,
            girlSkinType: this.girlSkinType,
            requireExp: this.requireExp,
            requirePictureNum: this.requirePictureNum,
            examDocIds: this.examDocIds,
            pictureDocIds: this.pictureDocIds,
        };
    }
}
