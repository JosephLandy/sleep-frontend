import React from 'react';
import { storiesOf } from '@storybook/react';
import { WeekDay, populateWeek, INightRecord } from '../shared/model';
// import CssBaseline froTim '@material-ui/core/CssBaseline';
import WeekView from '../components/WeekView';
import { DateTime, Duration } from 'luxon';
import { decorator } from '../App';

import {sampleWeek} from '../shared/sampledata';


storiesOf('WeekView', module)
    .addDecorator(decorator)
    .add('generated week', () => (
        <WeekView weekinput={sampleWeek} />
    ));