import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 社区等级细节表
*/
export default class CommunityDetail extends DataType
{
    /**
     * 唯一描述
     * 
     * @type {string}
     * @memberof CommunityDetail
     */
    public id: string;

    /**
     * 环境描述
     * 
     * @type {string}
     * @memberof CommunityDetail
     */
    public mode: string;

    /**
     * 是否上下线
     * 
     * @type {string}
     * @memberof CommunityDetail
     */
    public status: string;

    /**
     * 社区等级
     * 
     * @type {number}
     * @memberof CommunityDetail
     */
    public level: number;

    /**
     * 升级需要的经验值
     * 
     * @type {number}
     * @memberof CommunityDetail
     */
    public experience: number;

    /**
     * 社区名称
     * 
     * @type {string}
     * @memberof CommunityDetail
     */
    public name: string;

    /**
     * 社区背景图片
     * 
     * @type {string}
     * @memberof CommunityDetail
     */
    public backgroundImg: string;

    /**
     * 社区升级弹窗用缩略图
     * 
     * @type {string}
     * @memberof CommunityDetail
     */
    public thumbnail: string;

    /**
     * 是否是顶级
     * 
     * @type {boolean}
     * @memberof CommunityDetail
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
        this.level = data.level;
        this.experience = data.experience;
        this.name = data.name;
        this.backgroundImg = data.backgroundImg;
        this.thumbnail = data.thumbnail;
        this.top = data.top;

        return data;
    }

    public pack(): any
    {
        return {
            id: this.id,
            mode: this.mode,
            status: this.status,
            level: this.level,
            experience: this.experience,
            name: this.name,
            backgroundImg: this.backgroundImg,
            thumbnail: this.thumbnail,
            top: this.top,
        };
    }
}
