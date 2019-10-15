import React, { useState } from 'react';
import { INightRecord } from '../shared/model';

import { DialogActions, 
  Button, DialogContent, 
  DialogContentText, DialogTitle, Grid, Typography, TextField } from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { isEqual, cloneDeep } from 'lodash';

import {set, format} from 'date-fns';

import RatingSelect from './RatingSelect';
import TimePropertySelector from './TimePropertySelector';
import MedsAlcoholEditor from './MedsAlcoholEditor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ratingCell1: {
      // backgroundColor: green[200],
    },
    ratingCell2: {
      // backgroundColor: orange[200],
    },
    containerGrid: {
      flexGrow: 1,
      // backgroundColor: red[200],
    },
    heading: {
      float: "left",
    },
    heading2: {
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
  const [edits, setEdits] = useState<INightRecord>(cloneDeep(night));
  const [drugsEdits, setDrugsEdits] = useState([...night.medsAndAlcohol]);
  const classes = useStyles();

  const handleTimeChange = (t: Date | null, property: string) => {
    if (t) {
      // have to set the time to apply to this night, not the current date. 
      let corrected = set(night.dateAwake, {hours: t.getHours(), minutes: t.getMinutes()});
      setEdits(oldEdits => ({
        ...oldEdits,
        [property]: corrected,
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

  // console.log(`editing night of ${night.dateAwake.toLocaleString(DateTime.DATE_HUGE)}`);

  return (
    <React.Fragment>
      <DialogTitle disableTypography>
        <Typography className={classes.heading} variant="h6">
          Edit Night Record
        </Typography>
        <Typography className={classes.heading2} variant="subtitle1">
          {format(night.dateAwake, 'EEEE, MMMM do')}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
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

          <Grid item container xs={12} className={classes.containerGrid} spacing={3} justify="center" direction="row">
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
          <Grid item xs={12}>
            <TextField multiline defaultValue={edits.notes} fullWidth label="Notes" rows={4}
              onBlur={(e) => {
                if (e.target.value !== '') {
                  setEdits(oldEdits => {
                    return { ...oldEdits, notes: e.target.value }
                  });
                }
              }}/>
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