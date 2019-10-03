import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import { DateTime } from 'luxon';

import {IWeekRecord, INightRecord} from '../shared/model';
import NightView from './NightView';
// I can literally load an svg as a react component.
//https://create-react-app.dev/docs/adding-images-fonts-and-files
// import { ReactComponent as Triangle } from '../TriangleArrow-Left.svg';
// import { completeNight } from '../shared/sampledata';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

type WeekProps = {
  weekinput: IWeekRecord
};


export default function ({ weekinput }: WeekProps) {
  const classes = useStyles();
  // I'm going to just store the props into state. Apparently it's ok to use props
  // to initialize state. Sort of. Maybe. Ok for testing, but not necessarily long term. VERY BAD. CAUSED PROBLEMS.
  const [week, setWeek] = useState(weekinput);

  function onUpdateNight(night: INightRecord) {
    const updatedWeek = { ...week };
    updatedWeek.nights[night.dateAwake.weekday - 1] = night;
    // send the new/updated night to the api.
    console.log('Logging week - %O', updatedWeek);
    putNight(night);
    setWeek(updatedWeek);
  }

  return (
    <div>
      <Grid item container justify="space-between" wrap="nowrap" spacing={2} className={classes.root}>
        {weekinput.nights.map((night, index) => { // these should all be the same height
          return <NightView key={index} night={night} nightUpdated={onUpdateNight} />
        })}
      </Grid>
{/* 
      <Button onClick={e => {
        // I need to add a proxy for api requests from storybook separately from the 
        // react one. It looks a bit more complicated, but not too bad. 
        getPriorSubstances();
      }}>
        prior substances
      </Button>
      <Button onClick={e => {
        getNight();
      }}>
        night
      </Button>
      <Button onClick={e => {
        putNight(completeNight);
      }}>
        put night
      </Button>
      <Button onClick={e => {
        clearDatabase();
      }}>
        clear database
      </Button>
      <Button onClick={e => {
        getNight2(completeNight.dateAwake);

      }}>
        get complete night. 
      </Button> */}
    </div>
  );
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

// function getNight2(night: DateTime | string) {
//   let nightstr: string;
//   if (typeof night === 'string') {
//     nightstr = night;
//   } else {
//     nightstr = (night as DateTime).toISO();
//   }
//   fetch(`/api/nights/${nightstr}`).then(resp => {
//     console.log(resp.status);
//     return resp.text();
//   }).then(val => { console.log(val) });
// }

// function getPriorSubstances() {
//   fetch('/api/priorsubstances').then(resp => resp.json()).then(myjson => {
//     console.log(JSON.stringify(myjson));
//   });
// }

// function clearDatabase() {
//   fetch('/api/clear').then(resp => {
//     console.log(resp.statusText);
//   })
// }