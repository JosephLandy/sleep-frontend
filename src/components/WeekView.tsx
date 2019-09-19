import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import { days, IWeekRecord, INightRecord, } from '../model';
import NightView from './NightView';
// I can literally load an svg as a react component.
//https://create-react-app.dev/docs/adding-images-fonts-and-files
import { ReactComponent as Triangle } from '../TriangleArrow-Left.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    nextWeekButton: {
      width: 50,
      opacity: 50,
    },
  })
);

type WeekProps = {
  weekinput: IWeekRecord
};

// left and right buttons to advance or move back a week. 
// needs a bunch of states and things though. 
export function NextButton({ direction }: { direction: string }) {
  const classes = useStyles();
  if (direction === 'left') {
    return (
      <Button className={classes.nextWeekButton}>
        <Triangle width={40} />
      </Button>
    );
  } else {
    return (
      <Button className={classes.nextWeekButton}>
        <Triangle width={40} transform="rotate(180)" />
      </Button>
    );
  }
}

export default function ({ weekinput }: WeekProps) {
  // const classes = useStyles();
  // Because I have to keep state somewhere right now, I'm going to
  // just store the props into state. Apparently it's ok to use props
  // to initialize state. Sort of. Maybe. 
  const [week, setWeek] = useState(weekinput);

  function onUpdateNight(night: INightRecord) {
    const updatedWeek = { ...week };
    updatedWeek.nights[night.day] = night;
    setWeek(updatedWeek);
  }

  return (
    <div>
      <h2>
        {`week of ${week.weekOf.toLocaleString(DateTime.DATE_FULL)}`}
      </h2>
      <Grid container justify="space-between">
        <Grid item>
          <NextButton direction="left" />
        </Grid>
        {days.map(day => { // these should all be the same height
          return <NightView key={day} night={week.nights[day]} nightUpdated={onUpdateNight} />
        })}
        <Grid item>
          <NextButton direction="right" />
        </Grid>
      </Grid>
      <Button onClick={e => {
        // I need to add a proxy for api requests from storybook separately from the 
        // react one. It looks a bit more complicated, but not too bad. 
        fetch('/api/priorsubstances').then(resp => resp.json()).then(myjson => {
          console.log(JSON.stringify(myjson));
        })
      }}>
        fetch button
      </Button>
      <Button onClick={e => {
        // I need to add a proxy for api requests from storybook separately from the 
        // react one. It looks a bit more complicated, but not too bad. 
        fetch('/api/hello').then(resp => resp.json()).then(myjson => {
          console.log(JSON.stringify(myjson));
        })
      }}>
        fetch button 2
      </Button>

    </div>
  );
}