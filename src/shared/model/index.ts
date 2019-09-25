import { DateTime, Duration } from 'luxon';
import {cloneDeepWith} from 'lodash';
import { INightRecord, NightRecord} from './NightRecord';
// very silly, but I'm doing it. I like the underscore. 
const _ = { cloneDeepWith };
// export * from './NightRecord';
export * from './NightRecord';

export enum WeekDay {
  
  monday = "Monday",
  tuesday = "Tuesday",
  wednesday = "Wednesday",
  thursday = "Thursday",
  friday = "Friday",
  saturday = "Saturday",
  sunday = "Sunday",
}

export const days = [
  WeekDay.monday,
  WeekDay.tuesday,
  WeekDay.wednesday,
  WeekDay.thursday,
  WeekDay.friday,
  WeekDay.saturday,
  WeekDay.sunday,
];


export interface IWeekRecord {
  // date of start of the week. 
  weekOf: DateTime;
  // I guess this should contain 7 entries, or else placeholders.
  // or else index them by weekdays. 
  nights: {
    [morning: string]: INightRecord,
  };
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
    nights: {}
  };
  for (let current = weekOf; current < weekOf.endOf('week'); current = current.plus({ days: 1 })) {
    let day = days[current.weekday - 1];
    week.nights[day] = new NightRecord ({
      day,
      dateAwake: current,
      edited: false,
      interuptions: [],
      restedRating: '',
      sleepQuality: '',
      medsAndAlcohol: [],
    });
  }
  return week;
}