import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
// import './App.css';

import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import WeekNavigator from './components/WeekNavigator';
import { DateTime } from 'luxon';
// import AnalyticsView from './components/Analytics/AnalyticsViewD3';
import AnalyticsController from './components/Analytics/AnalyticsController';


const App: React.FC = () => {
  return (
    <div className="App">
      {decorator(() => {
        return (
        <div>
          <WeekNavigator initialDate={DateTime.local()} />
          {/* <AnalyticsController /> */}
        </div>);
      })}
    </div>
  );
}

export function decorator(contentFn: any) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          {contentFn()}
        </MuiPickersUtilsProvider>
      </ThemeProvider>
  );
}

export default App;
