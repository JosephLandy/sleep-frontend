import React from 'react';
import { storiesOf } from '@storybook/react';
import { WeekDay, INightRecord } from '../model';
import NightView from '../components/NightView';
import { CssBaseline } from '@material-ui/core';
import { DateTime } from 'luxon';
import {sampleWeek, completeNight} from './WeekView.stories';

import {decorator} from '../App';


storiesOf('NightView', module)
    .addDecorator(decorator)
    .add('sample', () => (
        <NightView night={sampleWeek.nights[WeekDay.friday]} />
    )).add('not edited', () => (
        <NightView night={{...sampleWeek.nights[WeekDay.friday], edited: false}} />
    )).add('complete', () => (
        <NightView night={completeNight} />
    ));