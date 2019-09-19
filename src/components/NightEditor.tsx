import React, { useState } from 'react';
import { INightRecord } from '../model';

import { DialogActions, 
  Button, DialogContent, 
  DialogContentText, DialogTitle, Grid, Typography } from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green, orange, red } from '@material-ui/core/colors';

import { isEqual } from 'lodash';

import { DateTime, } from 'luxon';

import RatingSelect from './RatingSelect';
import TimePropertySelector from './TimePropertySelector';
import MedsAlcoholEditor, { MedsAlcoholHandler } from './MedsAlcoholEditor';
import { DialogTitleProps } from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ratingCell1: {
      backgroundColor: green[200],
    },
    ratingCell2: {
      backgroundColor: orange[200],
    },
    containerGrid: {
      flexGrow: 1,
      backgroundColor: red[200],
    },
    heading: {
      // backgroundColor: red[200],
      float: "left",
    },
    heading2: {
      // backgroundColor: green[200],
      float: "right",
    }
  })
);

type NightEditorProps = {
  night: INightRecord;
  closeEditor: () => void;
  submit: (newNight: INightRecord) => void;
};


export default function NightEditor({ night, closeEditor, submit }: NightEditorProps) {
  // for the time being, this is a suitable deepcopy. Change when it gets 
  // more complicated.
  const [edits, setEdits] = useState<INightRecord>({ ...night });
  const [drugsEdits, setDrugsEdits] = useState([...night.medsAndAlcohol]);
  const classes = useStyles();

  const handleTimeChange = (t: DateTime | null, property: string) => {
    if (t) {
      setEdits(oldEdits => ({
        ...oldEdits,
        [property]: t,
      }));
    } else {
      setEdits(oldEdits => ({
        ...oldEdits,
        [property]: undefined,
      }));
    }
  };

  const handleRatingChange = (e: any) => {
    setEdits(oldEdits => ({
      ...oldEdits,
      [e.target.name as string]: e.target.value,
    }));
  };

  return (
    <React.Fragment>
      <DialogTitle disableTypography>
        <Typography className={classes.heading} variant="h6">
          Edit Night Record
        </Typography>
        <Typography className={classes.heading2} variant="subtitle1">
          {night.dateAwake.toLocaleString()}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {night.dateAwake.toLocaleString()}
        </DialogContentText>
        <Grid container spacing={2} direction="row">
          {/* <Grid container spacing={0} direction="column"> */}
          <Grid item xs={6}>
            <TimePropertySelector label="Went to bed at" property="bedTime" value={edits.bedTime}
              handleChange={handleTimeChange} />
          </Grid>
          <Grid item xs={6}>
            <TimePropertySelector label="Fell asleep at" property="fellAsleepAt" value={edits.fellAsleepAt}
              handleChange={handleTimeChange} />
          </Grid>
          <Grid item xs={6}>
            <TimePropertySelector label="Woke up at" property="wokeUp" value={edits.wokeUp}
              handleChange={handleTimeChange} />
          </Grid>
          <Grid item xs={6}>
            <TimePropertySelector label="got out of bed at" property="gotUp" value={edits.gotUp}
              handleChange={handleTimeChange} />
          </Grid>

          <Grid item xs={12} className={classes.containerGrid} container spacing={3} direction="row">
            <Grid item className={classes.ratingCell1} xs={4}>
              <RatingSelect value={edits.restedRating}
                label="Rested rating"
                name="restedRating"
                handleChange={handleRatingChange}
              />
            </Grid>

            <Grid item className={classes.ratingCell2} xs={4}>
              <RatingSelect value={edits.sleepQuality}
                label="Sleep quality"
                name="sleepQuality"
                handleChange={handleRatingChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MedsAlcoholEditor drugs={drugsEdits} drugsChanged={setDrugsEdits} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeEditor()}>
          Cancel
                </Button>
        <Button onClick={() => {
          if (!isEqual(night, { ...edits, medsAndAlcohol: drugsEdits })) {
            submit({ ...edits, medsAndAlcohol: drugsEdits, edited: true });
          } else {
            closeEditor();
          }
        }}>
          Submit
                </Button>
      </DialogActions>
    </React.Fragment>
  );
}