import React from 'react';
import { storiesOf } from '@storybook/react';
import { WeekDay, IWeekRecord, populateWeek } from '../model';
import CssBaseline from '@material-ui/core/CssBaseline';
import WeekView from '../components/WeekView';
import { DateTime } from 'luxon';


const unixtimestamp = 156002828
// const jsdate = new Date(unixtimestamp * 1000);
const luxonDate = DateTime.fromMillis(unixtimestamp * 1000);
export const sampleWeek = populateWeek(luxonDate);


storiesOf('WeekView', module)
    .addDecorator(storyFn => (
        <React.Fragment>
            <CssBaseline />
            {storyFn()}
        </React.Fragment>))
    .add('generated week', () => (
        <WeekView week={sampleWeek} />
    ));