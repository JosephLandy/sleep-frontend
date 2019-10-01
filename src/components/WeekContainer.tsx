import React, {useEffect, useState} from 'react'
import { DateTime } from 'luxon';
import WeekView, {NextButton} from './WeekView';

import {NightRecord, IWeekRecord, populateWeek} from '../shared/model';
import { CircularProgress} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { green, orange, red } from '@material-ui/core/colors';

type Props = {
  weekOf: DateTime;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    left: {
      // backgroundColor: green[700],
    },
    container: {
      // backgroundColor: green[700],
    },
    progressContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    progress: {
      color: orange[700],
    }
  })
);

export default function WeekContainer({weekOf}: Props) {
  const classes = useStyles();

  type StateType = {
    nights: NightRecord[],
    loaded: boolean
  }

  // these values will change at the same time, so they are grouped. 
  const [data, setData] = useState<StateType>({
    nights: [],
    loaded: false,
  });

  // const [week, setWeek] = useState<IWeekRecord>({weekOf: weekOf.startOf('week'), nights: [], loaded: false});
  // passing empty array of dependencies tells react that the effect never
  // needs to run more than once. Makes it effectively a componentDidMount.
  // get the initial record of the week from the server. 
  // don't need to get data again unless I switch to a different week
  useEffect(() => {
    getWeek();
  }, [weekOf]);

  // need to deal with the double tap case. User hits next/previous week button
  // again before the first request completes. Desired behavior is that the first
  // fetch should not result in a state update, and wait for the second to complete 
  // before changing state. 
  // function getWeek() {
  //   // I might be able to solve the double tap problem by copying the value of the week
  //   // that's being fetched, and then checking if it still equals the current week. 
  //   // better way to deal with this is probably to just rerender this with a different week identifier
  //   // as the input. Then the week gets loaded only when the component mounts. If the fetch completes,
  //   // then it doesn't matter because the component has been destroyed.
  //   const url = `/api/weeks/${week.weekOf.toISO()}`;
  //   fetch(url).then(resp => {
  //     if (resp.ok) {
  //       resp.json().then(jsonArray => {
  //         if (Array.isArray(jsonArray) && jsonArray.length > 0) {
  //           let nights = jsonArray.map((val) => NightRecord.fromSerial(val));
  //           nights = padNights(week.weekOf, nights);
  //           setWeek({
  //             weekOf: week.weekOf,
  //             nights,
  //             loaded: true,
  //           });
  //         }
  //       });
  //     } else if (resp.status === 404) {
  //       setWeek(populateWeek(week.weekOf));
  //     } else {
  //       console.log(resp.status);
  //     }
  //   });
  // }
  function getWeek() {
    // I might be able to solve the double tap problem by copying the value of the week
    // that's being fetched, and then checking if it still equals the current week. 
    // better way to deal with this is probably to just rerender this with a different week identifier
    // as the input. Then the week gets loaded only when the component mounts. If the fetch completes,
    // then it doesn't matter because the component has been destroyed.
    const url = `/api/weeks/${weekOf.toISO()}`;
    fetch(url).then(resp => {
      if (resp.ok) {
        resp.json().then(jsonArray => {
          if (Array.isArray(jsonArray) && jsonArray.length > 0) {
            let nights = jsonArray.map((val) => NightRecord.fromSerial(val));
            nights = padNights(weekOf, nights);
            setData({
              nights,
              loaded: true,
            });
          }
        });
      } else if (resp.status === 404) {
        let w = populateWeek(weekOf);
        setData({
          nights: (w.nights as NightRecord[]),
          loaded: true,
        });
        // setWeek(populateWeek(week.weekOf));
      } else {
        console.log(resp.status);
      }
    });
  }

  if (data.loaded) {
    const week: IWeekRecord = {
      nights: data.nights,
      loaded: true,
      weekOf
    };

    return (
      <div>
        <WeekView weekinput={week} />
      </div>
    );
  } else {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress className={classes.progress} size={120} />
      </div>
    )
  }
}

/**
 * If there are fewer than 7 nights in the passed array, 
 * return a new array in weekday order padding out initial
 * nights with empty ones in order for any weekdays that might 
 * be missing. 
 * @param ns array of nights in week
 */
function padNights(weekStart: DateTime, nightsInit: NightRecord[]) {
  if (nightsInit.length === 7) {
    return nightsInit;
  }
  let out: NightRecord[] = new Array<NightRecord>(7);
  for (let i = 0; i < out.length; i++) {
    if (nightsInit.length > 0 && i === nightsInit[0].dateAwake.weekday - 1) {
      out[i] = (nightsInit.shift() as NightRecord);
    } else {
      out[i] = new NightRecord(weekStart.plus({days: i}));
    }
  }
  return out;
}

