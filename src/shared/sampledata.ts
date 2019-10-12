import { populateWeek, INightRecord, NightRecord } from '../shared/model';
import {hoursToMS} from './model';
import {subDays, setHours, setMinutes} from 'date-fns';

const timestamp = 156002828 * 1000;
export const sampleWeek = populateWeek(new Date(timestamp));

const monday = sampleWeek.nights[0];
const completeNightOrig: INightRecord = {
  ...monday,
  edited: true,
  bedTime: setHours(monday.dateAwake, 3),
  // what day this is on would depend on when they went to bed.
  // what do I put if they didn't sleep for days?
  fellAsleepAt: setHours(monday.dateAwake, 4),
  interuptions: [
    {
      duration: hoursToMS(3),
      notes: "My sleep was interrupted. It was terrible",
    },
  ],
  wokeUp: setHours(monday.dateAwake, 13),
  gotUp: setMinutes(setHours(monday.dateAwake, 13), 35),
  restedRating: "4",
  sleepQuality: "5",
  medsAndAlcohol: [
    // To anyone who may read this on my github: 
    // this ARBITRARY TEST DATA is NOT indicative of my own personal habits and behavior. 
    {
      substance: 'beer',
      time: setHours(subDays(monday.dateAwake, 1), 22),
      quantity: 5,
    },
    {
      substance: 'melatonin',
      time: setHours(monday.dateAwake, 1),
      quantity: 2.5, // 2.5 mg is a reasonable melatonin dose. 
    },
    {
      substance: 'marijuana',
      time: setHours(subDays(monday.dateAwake, 1), 23),
    },
  ],
  // notes: "this is some notes about how I slept. \n I'm not really sure how I slept.",
  // notes: "",
}

// export const completeNight = NightRecord.fromNightRecord(completeNightOrig);
export const completeNight = completeNightOrig;

sampleWeek.nights[0] = completeNight;

export const priorSubstances = [
  {"name": "marijuana" },
  {"name": "beer" },
  {"name": "wine" },
];