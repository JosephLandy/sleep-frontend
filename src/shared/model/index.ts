import {startOfWeek, endOfWeek, addDays} from 'date-fns';
import { INightRecord, NightRecord} from './NightRecord';

export * from './NightRecord';


export interface IWeekRecord {
  // date of start of the week. 
  weekOf: Date;
  nights: INightRecord[];
}

/**
 * Creates a full week of INight records
 * @param {Date} dayInWeek An arbitrary date in the week, could be a Monday, Thursday or 
 * even a Wednesday! May include time as well. 
 */
export function populateWeek(dayInWeek: Date): IWeekRecord {
  let weekOf = startOfWeek(dayInWeek);
  let end = endOfWeek(dayInWeek);
  let week: IWeekRecord = {
    weekOf: weekOf,
    nights: [],
  };
  for (let current = weekOf; current < end; current = addDays(current, 1)) {
    week.nights.push(new NightRecord(current));
  }
  return week;
}

export function hoursToMS(hours: number) {
  return hours * 3600000;
}
