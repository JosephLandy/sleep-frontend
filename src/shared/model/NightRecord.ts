import { DateTime, Duration } from 'luxon';
import { cloneDeepWith } from 'lodash';
// very silly, but I'm doing it. I like the underscore. 

// export * from './NightRecord';
import {WeekDay, days} from '.';

const _ = { cloneDeepWith };

/*
if my finger is broken, call td insurance back, let them know. 
*/

// I need to standardize the time fields a bit more for whatever the 
// annoying time pickers need. 
export interface IBaseNightRecord<T_DATE, T_DUR, T_DAY> {
  edited: boolean;
  day: T_DAY;
  // this must be at like, midnight on the day. This is just for the date.
  // time is separate. 
  dateAwake: T_DATE;
  bedTime?: T_DATE | null;
  fellAsleepAt?: T_DATE | null;
  interuptions: Array<{
    duration: T_DUR;
    notes: string;
  }>;
  wokeUp?: T_DATE;
  gotUp?: T_DATE;
  restedRating: string;
  sleepQuality: string;
  medsAndAlcohol: Array<{
    substance: string;
    time?: T_DATE | null;
    // quantity should be optional
    quantity?: number;
  }>;
}

// this is the version that gets received by the server and the client.
// I don't think I need to create one of these to send, because the DateTime
// and Duration classes should automatically serialize to JSON as an ISO string.  
export type INightRecordSerial = IBaseNightRecord<string, string, WeekDay>;

export type INightRecordJSDate = IBaseNightRecord<Date, string, string>;

export type INightRecordDBFormat = IBaseNightRecord<Date, string, string>;

export type INightRecord = IBaseNightRecord<DateTime, Duration, WeekDay>;

export interface DrugRecord {
  substance: string;
  time: DateTime | null;
  // quantity should be optional
  quantity?: number;
}

export class NightRecord implements INightRecord {
  edited: boolean = false;  
  day: WeekDay;
  dateAwake: DateTime;
  bedTime?: DateTime | null | undefined;
  fellAsleepAt?: DateTime | null | undefined;
  interuptions: { duration: Duration; notes: string; }[] = [];
  wokeUp?: DateTime | undefined;
  gotUp?: DateTime | undefined;
  restedRating: string = '';
  sleepQuality: string = '';
  medsAndAlcohol: {
    substance: string; 
    time?: DateTime | null | undefined;
    // quantity should be optional
    quantity?: number | undefined;
  }[] = [];

  constructor(night: INightRecord) {
    this.edited = night.edited;
    this.dateAwake = night.dateAwake;

    this.day = night.day;

    console.log(night.day);
    console.log(days[night.dateAwake.weekday]);

    

    this.bedTime = night.bedTime;
    this.fellAsleepAt = night.fellAsleepAt;
    this.interuptions = night.interuptions;
    this.wokeUp = night.wokeUp;
    this.gotUp = night.gotUp;
    this.restedRating = night.restedRating;
    this.sleepQuality = night.sleepQuality;
    this.medsAndAlcohol = night.medsAndAlcohol;
  }

  static fromSerial(start: INightRecordSerial): NightRecord {
    let out: Partial<NightRecord> = {};
    out.edited = start.edited;
    out.dateAwake = DateTime.fromISO(start.dateAwake);
    out.day = start.day;

    if (start.bedTime)
      out.bedTime = DateTime.fromISO(start.bedTime);

    if (start.fellAsleepAt)
      out.fellAsleepAt = DateTime.fromISO(start.fellAsleepAt);

    out.interuptions = start.interuptions.map(({ duration, notes }) => {
      return { duration: Duration.fromISO(duration), notes };
    });

    if (start.wokeUp) {
      out.wokeUp = DateTime.fromISO(start.wokeUp);
    }
    if (start.gotUp) {
      out.gotUp = DateTime.fromISO(start.gotUp);
    }
    out.restedRating = start.restedRating;
    out.sleepQuality = start.sleepQuality;
    out.medsAndAlcohol = start.medsAndAlcohol.map(({ substance, time, quantity }) => {
      if (time) {
        return { substance, time: DateTime.fromISO(time), quantity };
      }
      return { substance, time: null, quantity };
    });
    return (new NightRecord(out as INightRecord));
  }

  toDBFormat() {
    let out: Partial<IBaseNightRecord<Date, string, WeekDay>> = {};
    out.edited = this.edited;
    out.dateAwake = this.dateAwake.toJSDate();
    out.day = this.day;

    if (this.bedTime)
      out.bedTime = this.bedTime.toJSDate();

    if (this.fellAsleepAt)
      out.fellAsleepAt = this.fellAsleepAt.toJSDate();

    out.interuptions = this.interuptions.map(({duration, notes}) => {
      return {duration: duration.toISO(), notes}
    });

    if (this.wokeUp) {
      out.wokeUp = this.wokeUp.toJSDate();
    }
    if (this.gotUp) {
      out.gotUp = this.gotUp.toJSDate();
    }
    out.restedRating = this.restedRating;
    out.sleepQuality = this.sleepQuality;
    out.medsAndAlcohol = this.medsAndAlcohol.map(({ substance, time, quantity }) => {
      if (time) {
        return { substance, time: time.toJSDate(), quantity };
      }
      return { substance, time: null, quantity };
    });
    return (out as INightRecordDBFormat);
  }

}


// https://lodash.com/docs/4.17.15#cloneWith
function customizerJSDate(value: any) {
  if (value && typeof value === 'object') {
    if (DateTime.isDateTime(value)) {
      return (value as DateTime).toJSDate();
    } else if (Duration.isDuration(value)) {
      return (value as Duration).toISO();
    }
  }
}

export function convertToJSDate(obj: INightRecord): INightRecordJSDate {
  return _.cloneDeepWith(obj, customizerJSDate);
}
