import {DateTime} from 'luxon';


export enum WeekDay {
    sunday = "Sunday",
    monday = "Monday",
    tuesday = "Tuesday",
    wednesday = "Wednesday",
    thursday = "Thursday",
    friday = "Friday",
    saturday = "Saturday"
};

export const days = [
    WeekDay.sunday,
    WeekDay.monday,
    WeekDay.tuesday,
    WeekDay.wednesday,
    WeekDay.thursday,
    WeekDay.friday,
    WeekDay.saturday
];

export interface INightRecord {
    day: WeekDay;
    // this must be at like midnight on the day. This is just for the date.
    // time is separate. 
    date_awake: DateTime;
    edited: boolean;
}

export interface IWeekRecord {
    // date of start of the week. 
    weekOf: DateTime;
    // I guess this should contain 7 entries, or else placeholders.
    // or else index them by weekdays. 
    nights: {
        [morning: string]: INightRecord,
    };
}

export function populateWeek(dayInWeek: DateTime): IWeekRecord {
    let weekOf = dayInWeek.startOf('week');
    let week: IWeekRecord = {
        weekOf: weekOf,
        nights: {}
    };
    for (let current = weekOf; current < weekOf.endOf('week'); current = current.plus({ days: 1 })) {
        let day = days[current.weekday - 1];
        week.nights[day] = {
            day,
            date_awake: current,
            edited: false,
        };
    }
    return week;
}


