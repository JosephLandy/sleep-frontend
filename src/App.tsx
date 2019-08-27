import React from 'react';

import WeekView from './components/WeekView';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import {WeekDay, IWeekRecord} from './model';
import {sampleWeek} from './stories/WeekView.stories';

const App: React.FC = () => {
    return (
        <div className="App">
            <React.Fragment>
                <CssBaseline />
                <WeekView week={sampleWeek}/>
            </React.Fragment>
        </div>
    );
}

export default App;
