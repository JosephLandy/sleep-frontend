import * as dt from 'date-fns';

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

export type INightRecord = IBaseNightRecord<Date, number>;

// this is the version that gets received by the server and the client.
// I don't think I need to create one of these to send, because the DateTime
// and Duration classes should automatically serialize to JSON as an ISO string,
// since they have toJSON.
export type INightRecordSerial = IBaseNightRecord<string, number>;



export interface DrugRecord {
  substance: string;
  time?: Date | null;
  // quantity should be optional
  quantity?: number;
}

export interface IntRecord {
  duration: number;
  notes: string;
}

// React probably won't retain the class fields, which should be fine, I just
// have to ensure it's a class instance before using info from react. 
export class NightRecord implements INightRecord {

  edited: boolean = false;
  dateAwake: Date;
  bedTime?: Date;
  fellAsleepAt?: Date;
  interuptions: Array<{ duration: number; notes: string; }> = [];
  wokeUp?: Date | undefined;
  gotUp?: Date | undefined;
  restedRating: string = '';
  sleepQuality: string = '';
  medsAndAlcohol: Array<{
    substance: string; 
    time?: Date | null | undefined;
    quantity?: number | undefined;
  }> = [];
  notes: string = '';

  constructor(date: Date) {
    this.dateAwake = dt.startOfDay(date);
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
    let k = new NightRecord(dt.parseISO(start.dateAwake))
    k.edited = start.edited;
    k.interuptions = start.interuptions;
    k.restedRating = start.restedRating;
    k.sleepQuality = start.sleepQuality;
    k.notes = start.notes;

    if (start.bedTime)
      k.bedTime = dt.parseISO(start.bedTime);
    if (start.fellAsleepAt)
      k.fellAsleepAt = dt.parseISO(start.fellAsleepAt);
    if (start.wokeUp)
      k.wokeUp = dt.parseISO(start.wokeUp);
    if (start.gotUp)
      k.gotUp = dt.parseISO(start.gotUp);

    k.medsAndAlcohol = start.medsAndAlcohol.map(({ substance, time, quantity }) => {
      if (time)
        return { substance, time: dt.parseISO(time), quantity };
      return { substance, time: null, quantity };
    });

    return k;
  }
}