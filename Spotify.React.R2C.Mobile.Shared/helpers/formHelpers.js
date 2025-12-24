import moment from 'moment'
import 'moment-timezone';

const getTimZOne = () => {


    switch (window.countryCode) {
        case "US": {

            return 'America/New_York';
        }
        case "GB": {

            return 'America/New_York';
        }
        case "CA": {

            return 'America/New_York';
        }

        default:
            {
                return 'America/New_York';
            }
    }
}

//No-show deposit
const getTimZOneNew = () => {


    switch (window.countryCode) {
        case "US": {

            return 'America/New_York';
        }
        case "GB": {

            return 'Europe/London';
        }
        case "CA": {

            return 'America/New_York';
        }

        default:
            {
                return 'America/New_York';
            }
    }
}
export default {
    constructFormData: (values) => {
        let { countryObj, terms, ...formData } = values;
        let structuredFormData = {};
        for (let property in formData) {
            if (typeof formData[property] === 'string') {
                structuredFormData[property] = formData[property].trim();
            } else {
                structuredFormData[property] = formData[property];
            }
        }
        return structuredFormData;
    },

    isValueNumber: (value) => {
        const reg = new RegExp('(^[0-9]*$)');
        if (reg.test(value)) {
            return true;
        }
        return false;
    },

    isUniqueIdValid: (value, regex, len) => {
        const reg = new RegExp(regex);
        if (reg.test(value) && (value.length <= len)) {
            return true;
        } else {
            return false;
        }
    },

    isSecondaryUniqueIdValid: (value, regex, len) => {
        const reg = new RegExp(regex);
        if (reg.test(value) && (value.length <= len)) {
            return true;
        } else {
            return false;
        }
    },

    isBusinessIdValid: (value, regex, len) => {
        const reg = new RegExp(regex);
        if (reg.test(value) && (value.length <= len)) {
            return true;
        } else {
            return false;
        }
    },


    isBusinessIdValidPH: (value, regex, len,minLen) => {
        const reg = new RegExp(regex);
        if ((reg.test(value) && (value.length <= len)) || ((reg.test(value) && (value.length <= minLen))) ) {
            return true;
        } else {
            return false;
        }
    },

    isTaxIdValid: (value, regex) => {
        const reg = new RegExp(regex);
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },


    isPostalCodeValid: (value) => {
        let regex = new RegExp('^([A-Za-z]|[A-Za-z][0-9]|[A-Za-z][0-9][A-Za-z]|[A-Za-z][0-9][A-Za-z][ -]|[A-Za-z][0-9][A-Za-z][ -][0-9]|[A-Za-z][0-9][A-Za-z][ -][0-9][A-Za-z]|[A-Za-z][0-9][A-Za-z][ -][0-9][A-Za-z][0-9])$')
        return regex.test(value)
    },

    formatTime: (value) => {
        var tz = getTimZOne();

        if (value === "0001-01-01T00:00:00") {
            var time = "12:00"
            var day = moment().zone('GMT');
            var splitTime = time.split(/:/)
            day.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime[1])).seconds(0).milliseconds(0);
            return day.format('h:mm A');
        }
        var tz = getTimZOne();
        if (tz == "GMT") {
            return moment.utc(value).tz(tz).format('h:mm A');
        } else {
            return moment.utc(value).tz(tz).format('h:mm A');
        }

    },

    formatDate: (value) => {
        var tz = getTimZOne();
        if (value == "") {
            return moment.utc().tz(tz).format('MMM DD, YYYY');
        }
        return moment.utc(value).tz(tz).format('MMM DD, YYYY');

    },

    formatDateTime: (value) => {
        var tz = getTimZOne();
        if (value == "") {
            return moment.utc().tz(tz).format('ddd, MMM DD [at] hh:mm A');
        }
        return moment.utc(value).tz(tz).format('ddd, MMM DD [at] hh:mm A');

    },
    //No-show Deposit
    formatDateTimeNew: (value) => {
        var tz = getTimZOneNew();
        if (value == "") {
            return moment.utc().tz(tz).format('ddd, MMM DD [at] hh:mm A');
        }
        return moment.utc(value).tz(tz).format('ddd, MMM DD [at] hh:mm A');

    },

    formatDateTimeInterval: (value) => {
        var tz = getTimZOne();
        if (value !== "") {
            return moment(value).format('ddd, MMM DD [at] hh:mm A');
        }
    },


    formatShortDateTime: (value) => {
        var tz = getTimZOne();
        if (value == "") {
            return moment.utc().tz(tz).format('MMM DD [at] hh:mm A');
        }
        return moment.utc(value).tz(tz).format('MMM DD [at] hh:mm A');

    },

    formatShortDate: (value) => {
        var tz = getTimZOne();
        if (value == "") {
            return moment.utc().tz(tz).format('MM/DD/YYYY');
        }
        return moment.utc(value).tz(tz).format('MM/DD/YYYY');

    },

    formatTimeAddHours: (value, hours) => {
        var tz = getTimZOne();
        return moment.utc(value).tz(tz).add(hours, 'h').format('h:mm A');
    },

};
