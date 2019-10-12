import React, {useState, ComponentClass} from 'react';
import { Typography, IconButton, TextField, 
  Divider, Toolbar, AppBar } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { green } from '@material-ui/core/colors';

import WeekContainer from './WeekContainer';
import {startOfWeek, subWeeks, addWeeks, format} from 'date-fns';

type Props = {
  initialDate: Date;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
    },
    toolbar: {
    },
    rightIcon: {
      float: "right",
    },
    navigation: {
      display: "flex",
      alignItems: "center",
      margin: "auto",
    },
    customText: {
      backgroundColor: green[400],
    }
  })
);

export default function WeekNavigator({initialDate}: Props) {
  const classes = useStyles();
  let [current, setCurrent] = useState(startOfWeek(initialDate));

  function back() {
    console.log('back one week');
    setCurrent(subWeeks(current, 1));
  }

  function next() {
    console.log('next week');
    const nw = addWeeks(current, 1);
    if (nw <= new Date()) {
      setCurrent(nw);
    }
  }
  
  function handleDatePicker(date: Date | null) {
    if (date) {
      const weekStart = startOfWeek(date);
      // week start must be less than datetime.local. Otherwise it's too far. 
      const local = new Date();
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
            <Typography>
              Week of 
            </Typography>
            <DatePicker value={current} onChange={handleDatePicker}
              disableFuture
              labelFunc={() => format(current, 'MMMM do, y')}
            />
            <IconButton
              edge="end"
              style={{ float: "right" }} 
              onClick={next}
              disabled={addWeeks(current, 1) <= new Date() ? false : true}
            >
              <NavigateBeforeIcon transform="rotate(180)" fontSize="large" />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
      {/* this extra toolbar is what all the material ui examples show to prevent
      overlap. Seems really wierd, but ok. I think it's basically just a 
      div with a few extra css rules, so not a big deal.*/}
      <Toolbar/> 
      <WeekContainer weekOf={current}/>
    </div>
    
  )
}