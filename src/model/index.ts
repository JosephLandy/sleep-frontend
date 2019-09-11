import {DateTime, Duration} from 'luxon';


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
    edited: boolean;
    day: WeekDay;
    // this must be at like midnight on the day. This is just for the date.
    // time is separate. 
    dateAwake: DateTime;
    bedTime?: DateTime | null;
    fellAsleepAt?: DateTime | null;
    interuptions: Array<{
        duration: Duration;
        notes: string;
    }>;
    wokeUp?: DateTime;
    gotUp?: DateTime;
    restedRating: string;
    sleepQuality: string;
    medsAndAlcohol: Array<DrugRecord>;
}

export interface DrugRecord {
    substance: string;
    time: DateTime;
    // quantity should be optional
    quantity?: number;
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

/**
 * Creates a full week of INight records
 * @param {DateTime} dayInWeek An arbitrary date in the week, could be a Monday, Thursday or 
 * even a Wednesday!
 */
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
            dateAwake: current,
            edited: false,
            interuptions: [],
            restedRating: '',
            sleepQuality: '',
            medsAndAlcohol: [],
        };
    }
    return week;
}

