import React from 'react';
import { storiesOf } from '@storybook/react';
import { WeekDay, INightRecord } from '../model';
import NightView from '../components/NightView';
import { CssBaseline } from '@material-ui/core';
import { DateTime } from 'luxon';
import {sampleWeek} from './WeekView.stories';

export const sampleNight: INightRecord = {
    day: WeekDay.sunday,
    edited: true,
    date_awake: DateTime.local(1759, 2, 9, 0, 0,),
};

storiesOf('NightView', module).addDecorator(storyFn => (
        <React.Fragment>
            <CssBaseline />
            {storyFn()}
        </React.Fragment>
    )).add('sample', () => (
        <NightView night={sampleWeek.nights[WeekDay.friday]} />
    )).add('not edited', () => (
        <NightView night={{...sampleWeek.nights[WeekDay.friday], edited: false}} />
    )).add('edited', () => (
        <NightView night={{ ...sampleWeek.nights[WeekDay.friday], edited: true }} />
    ));