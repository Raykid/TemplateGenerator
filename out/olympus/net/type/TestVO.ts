import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * TestVO
*/
export default class TestVO extends DataType
{
    /**
     * 奖励物品及数量
     * 
     * @type {{[key:string]:number}}
     * @memberof TestVO
     */
    public testMap: {[key:string]:number} = {};

    /**
     * 奖励物品及数量
     * 
     * @type {{[key:string]:number}[]}
     * @memberof TestVO
     */
    public testMapList: {[key:string]:number}[] = [];

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.testMap = NetUtil.parseMap(data.testMap);
        this.testMapList = NetUtil.parseArray(data.testMapList);

        return data;
    }

    public pack(): any
    {
        return {
            testMap: NetUtil.packMap(this.testMap),
            testMapList: NetUtil.packArray(this.testMapList),
        };
    }
}
