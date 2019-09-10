import React from 'react';
import { storiesOf } from '@storybook/react';
import { WeekDay, populateWeek, INightRecord } from '../model';
// import CssBaseline from '@material-ui/core/CssBaseline';
import WeekView from '../components/WeekView';
import { DateTime, Duration } from 'luxon';
import { decorator } from '../App';


const unixtimestamp = 156002828
// const jsdate = new Date(unixtimestamp * 1000);
const luxonDate = DateTime.fromMillis(unixtimestamp * 1000);
export const sampleWeek = populateWeek(luxonDate);

const monday = sampleWeek.nights[WeekDay.monday];
export const completeNight: INightRecord = {
    ...monday,
    edited: true,
    bedTime: monday.dateAwake.set({hour: 3}),
    // what day this is on would depend on when they went to bed.
    // what do I put if they didn't sleep for days?
    fellAsleepAt: monday.dateAwake.set({hour: 4}),
    interuptions: [
        {
            duration: Duration.fromObject({hours: 3}),
            notes: "My sleep was interrupted. It was terrible",
        },
    ],
    wokeUp: monday.dateAwake.set({hour: 13}),
    gotUp: monday.dateAwake.set({hour: 13, minute: 35}),
    restedRating: "4",
    sleepQuality: "5",
    medsAndAlcohol: [
        // To anyone who may read this on my github: 
        // this ARBITRARY TEST DATA is NOT indicative of my own personal habits and behavior. 
        {
            substance: 'beer',
            time: monday.dateAwake.minus({days: 1}).set({hour: 22}),
            quantity: 5,
        },
        {
            substance: 'melatonin',
            time: monday.dateAwake.set({hour: 1}),
            quantity: 2.5, // 2.5 mg is a reasonable melatonin dose. 
        },
        {
            substance: 'marijuana',
            time: monday.dateAwake.minus({days: 1}).set({hour: 23}),
        },
    ]
}

sampleWeek.nights[WeekDay.monday] = completeNight;

storiesOf('WeekView', module)
    .addDecorator(decorator)
    .add('generated week', () => (
        <WeekView weekinput={sampleWeek} />
    ));