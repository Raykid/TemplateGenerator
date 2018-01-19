import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 配置表版本信息
*/
export default class ResourceConfigVO extends DataType
{
    /**
     * 表描述
     * 
     * @type {string}
     * @memberof ResourceConfigVO
     */
    public tableDesc: string;

    /**
     * 分类
     * 
     * @type {string}
     * @memberof ResourceConfigVO
     */
    public category: string;

    /**
     * 表名称（获取资源唯一标识）
     * 
     * @type {string}
     * @memberof ResourceConfigVO
     */
    public tableName: string;

    /**
     * 版本号
     * 
     * @type {string}
     * @memberof ResourceConfigVO
     */
    public version: string;

    /**
     * 资源URL
     * 
     * @type {string}
     * @memberof ResourceConfigVO
     */
    public url: string;

    /**
     * 资源类型( DatabaseData,CdnUrl)
     * 
     * @type {string}
     * @memberof ResourceConfigVO
     */
    public downloadType: string;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.tableDesc = data.tableDesc;
        this.category = data.category;
        this.tableName = data.tableName;
        this.version = data.version;
        this.url = data.url;
        this.downloadType = data.downloadType;

        return data;
    }

    public pack(): any
    {
        return {
            tableDesc: this.tableDesc,
            category: this.category,
            tableName: this.tableName,
            version: this.version,
            url: this.url,
            downloadType: this.downloadType,
        };
    }
}
