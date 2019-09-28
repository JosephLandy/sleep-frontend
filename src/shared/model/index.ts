import { DateTime, Duration } from 'luxon';
import {cloneDeepWith} from 'lodash';
import { INightRecord, NightRecord} from './NightRecord';
// very silly, but I'm doing it. I like the underscore. 
const _ = { cloneDeepWith };
// export * from './NightRecord';
export * from './NightRecord';


export interface IWeekRecord {
  // date of start of the week. 
  weekOf: DateTime;
  nights: INightRecord[];
  loaded: boolean;
}

/**
 * Creates a full week of INight records
 * @param {DateTime} dayInWeek An arbitrary date in the week, could be a Monday, Thursday or 
 * even a Wednesday! May include time as well. 
 */
export function populateWeek(dayInWeek: DateTime): IWeekRecord {
  let weekOf = dayInWeek.startOf('week');
  let week: IWeekRecord = {
    weekOf: weekOf,
    nights: [],
    loaded: true,
  };
  for (let current = weekOf; current < weekOf.endOf('week'); current = current.plus({ days: 1 })) {
    week.nights.push(new NightRecord(current));
  }
  return week;
}