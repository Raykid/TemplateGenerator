import DataType from "olympus-r/engine/net/DataType";
import * as NetUtil from "olympus-r/engine/net/NetUtil";

/**
 * @author TemplateGenerator
 * @email initial_r@qq.com
 * 
 * 完成工作次数
*/
export default class CompleteWorkVO extends DataType
{
    /**
     * careerWorkId
     * 
     * @type {string}
     * @memberof CompleteWorkVO
     */
    public careerWorkId: string;

    /**
     * completeTimes
     * 
     * @type {number}
     * @memberof CompleteWorkVO
     */
    public completeTimes: number;

    protected doParse(data: any): any
    {
        if (data == null) {
            return;
        }
        this.careerWorkId = data.careerWorkId;
        this.completeTimes = data.completeTimes;

        return data;
    }

    public pack(): any
    {
        return {
            careerWorkId: this.careerWorkId,
            completeTimes: this.completeTimes,
        };
    }
}
