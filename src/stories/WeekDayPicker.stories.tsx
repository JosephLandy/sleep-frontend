import React from 'react';
import { storiesOf } from '@storybook/react';

import WeekDayPicker from '../components/WeekDayPicker';
import {WeekDay} from '../shared/model';
import { CssBaseline } from '@material-ui/core';
// storiesOf('WeekDayPicker', module).add('Monday', () => <WeekDayPicker value={WeekDay.monday}/>)
storiesOf('WeekDayPicker', module).addDecorator(storyFn => (
    <React.Fragment>
        <CssBaseline />
        {storyFn()}
    </React.Fragment>
)).add('Monday', () => <WeekDayPicker value={WeekDay.monday} />)