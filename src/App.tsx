import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
// import './App.css';

import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import WeekNavigator from './components/WeekNavigator';
import { DateTime } from 'luxon';


const App: React.FC = () => {
    return (
        <div className="App">
            {decorator(() => <WeekNavigator initialDate={DateTime.local()} />)}
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
