
import { normalize, schema } from "normalizr";
import * as moment from "moment";


const _schema = new schema.Entity("Metrics", {}, { idAttribute: 'id' });


export const getData = (payload, programCrmId) => {
    let data = {
        ...payload,
        id: programCrmId
    }
    const wrangledData = normalize(data, _schema);
    const defaultSortOrder = wrangledData.result;
    return wrangledData.entities.Metrics;
}
