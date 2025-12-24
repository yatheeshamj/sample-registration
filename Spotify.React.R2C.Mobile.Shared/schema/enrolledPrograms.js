import React from "react"
import { normalize, schema } from "normalizr";

const _schema = new schema.Entity("Programs", {}, { idAttribute: 'crmId' });


export const transformData = o => {
    return {
        ...o
    }
}

export const extractListData = (payload) => {

    let listPayload = payload.map((o) => transformData(o));
    const wrangledData = normalize(listPayload, [_schema]);
    const defaultSortOrder = wrangledData.result;
    const Programs = wrangledData.entities.Programs;

    return {
        data: Programs,
        ids: defaultSortOrder
    }
}
