import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

import WeekView from './components/WeekView';
import './App.css';

import {WeekDay, IWeekRecord} from './model';
import {sampleWeek} from './stories/WeekView.stories';

import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';


const App: React.FC = () => {
    return (
        <div className="App">
            {decorator(() => <WeekView weekinput={sampleWeek} />)}
        </div>
    );
}

export function decorator(contentFn: any) {
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    {contentFn()}
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
