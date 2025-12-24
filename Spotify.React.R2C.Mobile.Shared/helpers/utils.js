import moment from "moment";
import "moment-timezone";


export const getDateDifferenceInDays = (from, now = moment()) => {
  now = moment.utc(now).startOf('day');
  from = moment.utc(from).startOf('day');
  let duration = moment.duration(from.diff(now));
  return Math.floor(duration.asDays());
}
