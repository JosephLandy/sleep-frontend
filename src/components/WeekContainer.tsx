import React, {useEffect, useState} from 'react'
import { DateTime } from 'luxon';
import WeekView from './WeekView';
import {NightRecord, IWeekRecord, populateWeek, INightRecord} from '../shared/model';
import { CircularProgress, Grid} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import NightView from './NightView';

import {cloneDeep} from 'lodash';

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
    nights: INightRecord[],
    loaded: boolean
  }

  // these values will change at the same time, so they are grouped. 
  const [data, setData] = useState<StateType>({
    nights: [],
    loaded: false,
  });
  // get the initial record of the week from the server. 
  // don't need to get data again unless I switch to a different week
  useEffect(() => {
    const url = `/api/weeks/${weekOf.toISO()}`;
    fetch(url).then(resp => {
      if (resp.ok) {
        resp.json().then(jsonArray => {
          if (Array.isArray(jsonArray) && jsonArray.length > 0) {
            let nights: INightRecord[] = jsonArray.map((val) => NightRecord.fromSerial(val));
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
          // nights: (w.nights as NightRecord[]),
          nights: w.nights,
          loaded: true,
        });
      } else {
        console.log(resp.status);
      }
    });
  }, [weekOf]);


  function onUpdateNight(night: INightRecord) {
    let updatedNights = [...data.nights];
    updatedNights[night.dateAwake.weekday - 1] = night;
    putNight(night);
    setData({
      ...data,
      nights: updatedNights,
    });
  }

  if (data.loaded) {
    const week: IWeekRecord = {
      nights: data.nights,
      loaded: true,
      weekOf
    };
    return (
      <Grid container justify="space-between" wrap="nowrap" spacing={2} className={classes.root}>
        {data.nights.map(
          (night, index) => <NightView key={index} night={night} nightUpdated={onUpdateNight} />
        )}
      </Grid>
    )
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
function padNights(weekStart: DateTime, nightsInit: INightRecord[]) {
  if (nightsInit.length === 7) {
    return nightsInit;
  }
  let out: INightRecord[] = new Array<INightRecord>(7);
  for (let i = 0; i < out.length; i++) {
    if (nightsInit.length > 0 && i === nightsInit[0].dateAwake.weekday - 1) {
      out[i] = (nightsInit.shift() as INightRecord);
    } else {
      out[i] = new NightRecord(weekStart.plus({days: i}));
    }
  }
  return out;
}

function putNight(night: INightRecord) {
  // console.log(JSON.stringify(night));
  console.log('called putNight');
  fetch('/api/nights', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(night),
  }).then((response) => {
    console.log('posted night');
    console.log(response.statusText);
  })
    .catch(error => {
      console.log(`error occured ${error}`);
    });
}

