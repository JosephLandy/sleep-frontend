import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import WeekNavigator from './components/WeekNavigator';
// import AnalyticsView from './components/Analytics/AnalyticsViewD3';
import AnalyticsController from './components/Analytics/AnalyticsController';


const App: React.FC = () => {
  return (
    <div className="App">
      {decorator(() => {
        return (
        <div>
          <WeekNavigator initialDate={new Date()} />
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {contentFn()}
        </MuiPickersUtilsProvider>
      </ThemeProvider>
  );
}

export default App;
