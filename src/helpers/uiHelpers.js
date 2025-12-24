import moment from "moment";
import "moment-timezone";
import qs from 'qs';

import { getDateDifferenceInDays as getDateDifferenceInDaysBase } from "spotify-shared/helpers/utils"


export default {

    formatMobileNumber: (value, regexPattern, replacementFormat) => {
        const unformattedPhone = value.toString();



        const formattedPhone = unformattedPhone.replace(new RegExp(regexPattern), replacementFormat);




        return formattedPhone;
    },
    // formatUKMobileNumber: (value) => {
    //     const unformattedPhone = value.toString();

    //     const firstHalf = unformattedPhone.substring(0,5);
    //     const secondHalf = unformattedPhone.substring(5);
    //     const formattedPhone = `${firstHalf} ${secondHalf}`;

    //     return formattedPhone;
    // },
    // formatInMobileNumber:(value)=>{
    //     const unformattedPhone = value.toString();

    //     const areaCode = unformattedPhone.substring(0, 3);
    //     const laterhalf=unformattedPhone.substring(3)

    //     const formattedPhone = `${areaCode} ${laterhalf}`;

    //     return formattedPhone;
    // }
};

export const getDateDifferenceInDays = (from, now = moment.utc()) => {

    return getDateDifferenceInDaysBase(from, now)
}

export const getAgentStepFromURL = (queryString) => {
    const queryObj = qs.parse(queryString, { ignoreQueryPrefix: true });
    return queryObj.step;
}
