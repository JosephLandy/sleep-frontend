import React, {useState} from 'react';
import { DateTime } from 'luxon';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Typography, IconButton } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { green } from '@material-ui/core/colors';

// import {sampleWeek} from '../shared/sampledata'
// import WeekView from './WeekView';
import WeekContainer from './WeekContainer';

type Props = {
  initialDate: DateTime;
}

/*
I need to add an analytics route to the backend thing for the database 
*/

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      backgroundColor: green[400],
    },
    toolbar: {
      // backgroundColor: orange[400],
    },
    rightIcon: {
      // transform: "rotate(180deg)",
      float: "right",
    },
    navigation: {
      display: "flex",
      alignItems: "center",
      margin: "auto",
    },
  })
);

export default function WeekNavigator({initialDate}: Props) {
  const classes = useStyles();
  let [current, setCurrent] = useState(initialDate.startOf('week'));
  // not totally sure why I need both an AppBar and a toolbar, but apparently I do.
  function back() {
    console.log('back one week');
    setCurrent(current.minus({weeks: 1}));
  }

  function next() {
    console.log('next week');
    const nw = current.plus({weeks: 1});
    if (nw <= DateTime.local()) {
      setCurrent(nw);
    }
  }

  function datePickerLabel() {
    return ` ${current.toLocaleString(DateTime.DATE_FULL)}`
  }

  function handleDatePicker(date: DateTime | null) {
    if (date) {
      const weekStart = date.startOf('week');
      // week start must be less than datetime.local. Otherwise it's too far. 
      const local = DateTime.local();
      if (weekStart <= local) {
        setCurrent(weekStart);
      }
    }
  }

  return (
    <div onKeyDown={(e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        back();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    }}>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.navigation}>
            <IconButton style={{ float: "left" }} onClick={back}>
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            {/* one of the examples for datepicker shows highlighting selected weeks */}
            <Typography>
              Week of 
            </Typography>
            <DatePicker value={current} onChange={handleDatePicker}
              disableFuture
              labelFunc={datePickerLabel}
            />
            {/* <Typography>
              {`Week of ${current.toLocaleString(DateTime.DATE_FULL)}`}
            </Typography> */}
            <IconButton
              edge="end"
              style={{ float: "right" }} 
              onClick={next}
              disabled={current.plus({weeks: 1}) <= DateTime.local() ? false : true}
            >
              <NavigateBeforeIcon transform="rotate(180)" fontSize="large" />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
      {/* this extra toolbar is what all the material ui examples show to prevent
      overlap. Seems really wierd, but ok. I think it's basically just a 
      div with a few extra css rules.*/}
      <Toolbar/> 
      <WeekContainer weekOf={current}/>
    </div>
    
  )
}