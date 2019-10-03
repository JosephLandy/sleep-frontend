import { DateTime, Duration } from 'luxon';
import { cloneDeepWith } from 'lodash';

// very silly, but I'm doing it. I like the underscore for lodash.
const _ = { cloneDeepWith };


// I need to standardize the time fields a bit more for whatever the 
// annoying time pickers need. 
export interface IBaseNightRecord<T_DATE, T_DUR> {
  edited: boolean;
  // this must be at like, midnight on the day. This is just for the date.
  // times are recorded separately 
  dateAwake: T_DATE;
  // bedTime?: T_DATE | null;
  bedTime?: T_DATE;
  // fellAsleepAt?: T_DATE | null;
  fellAsleepAt?: T_DATE;
  wokeUp?: T_DATE;
  gotUp?: T_DATE;
  interuptions: Array<{
    duration: T_DUR;
    notes: string;
  }>;
  restedRating: string;
  sleepQuality: string;
  medsAndAlcohol: Array<{
    substance: string;
    time?: T_DATE | null;
    quantity?: number;
  }>;

  notes: string;
}

// this is the version that gets received by the server and the client.
// I don't think I need to create one of these to send, because the DateTime
// and Duration classes should automatically serialize to JSON as an ISO string,
// since they have toJSON.
export type INightRecordSerial = IBaseNightRecord<string, string>;

export type INightRecordJSDate = IBaseNightRecord<Date, string>;

export type INightRecordDBFormat = IBaseNightRecord<Date, string>;

export type INightRecord = IBaseNightRecord<DateTime, Duration>;

export interface DrugRecord {
  substance: string;
  time?: DateTime | null;
  // quantity should be optional
  quantity?: number;
}

export interface IntRecord {
  duration: Duration;
  notes: string;
}

// React probably won't retain the class fields, which should be fine, I just
// have to ensure it's a class instance before using info from react. 
export class NightRecord implements INightRecord {
  edited: boolean = false;
  dateAwake: DateTime;
  bedTime?: DateTime;
  fellAsleepAt?: DateTime;
  interuptions: Array<{ duration: Duration; notes: string; }> = [];
  wokeUp?: DateTime | undefined;
  gotUp?: DateTime | undefined;
  restedRating: string = '';
  sleepQuality: string = '';
  medsAndAlcohol: Array<{
    substance: string; 
    time?: DateTime | null | undefined;
    quantity?: number | undefined;
  }> = [];
  notes: string = '';

  constructor(dt: DateTime) {
    this.dateAwake = dt.startOf('day');
  }

  static fromNightRecord(night: INightRecord) {
    let k = new NightRecord(night.dateAwake);
    k.bedTime = night.bedTime;
    k.fellAsleepAt = night.fellAsleepAt;
    k.interuptions = night.interuptions;
    k.wokeUp = night.wokeUp;
    k.gotUp = night.gotUp;
    k.restedRating = night.restedRating;
    k.sleepQuality = night.sleepQuality;
    k.medsAndAlcohol = night.medsAndAlcohol;
    return k;
  }

  static fromSerial(start: INightRecordSerial): NightRecord {
    // let out: Partial<NightRecord> = {};
    let k = new NightRecord(DateTime.fromISO(start.dateAwake))
    k.edited = start.edited;
    if (start.bedTime)
      k.bedTime = DateTime.fromISO(start.bedTime);

    if (start.fellAsleepAt)
      k.fellAsleepAt = DateTime.fromISO(start.fellAsleepAt);

    k.interuptions = start.interuptions.map(({ duration, notes }) => {
      return { duration: Duration.fromISO(duration), notes };
    });

    if (start.wokeUp)
      k.wokeUp = DateTime.fromISO(start.wokeUp);

    if (start.gotUp)
      k.gotUp = DateTime.fromISO(start.gotUp);

    k.restedRating = start.restedRating;
    k.sleepQuality = start.sleepQuality;
    k.medsAndAlcohol = start.medsAndAlcohol.map(({ substance, time, quantity }) => {
      if (time)
        return { substance, time: DateTime.fromISO(time), quantity };

      return { substance, time: null, quantity };
    });
    return k;
  }

  toDBFormat() {

    // I bet I could replace this with
    // return convertToJSDate(this);

    let out: Partial<INightRecordDBFormat> = {};
    out.edited = this.edited;
    out.dateAwake = this.dateAwake.toJSDate();

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
