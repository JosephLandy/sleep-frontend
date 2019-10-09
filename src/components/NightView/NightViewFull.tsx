import React, { useState } from 'react';
import {NVProps} from '.';


import { Grid, Paper, Box, Fab, Typography, Dialog, Divider, } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { INightRecord } from '../../shared/model';
import AddIcon from '@material-ui/icons/Add';
import NightEditor from '../NightEditor';
// import TextField from '@material-ui/core/TextField';
import { DateTime } from 'luxon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divClickable: {
      width: "100%",
      height: "100%",
    },
    field: {
      marginBottom: 12,
    },
    timefield: {
      // borderBottom: 1,
      borderWidth: 4,
      borderColor: theme.palette.secondary.main,
      // backgroundColor: theme.palette.secondary.main,
    },
    fieldLabel: {
      // display: 'inline',
      // textDecoration: 'underline',
    },
    fieldValue: {
      // display: 'inline',
      // float: "right",
    }
  }),
);


type TFProps = {
  t?: DateTime;
  l: string;
}
export function TimeField({ t, l }: TFProps) {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.field}>
      <Box display="flex">
        <Typography className={classes.fieldLabel} variant="body1">{l}</Typography>
        <Box flexGrow={1} borderBottom={1} borderColor="primary.main">
          <Typography className={classes.fieldValue} align="right" variant="body1">
            {` ${t ? t.toLocaleString(DateTime.TIME_SIMPLE) : ''}`}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

type Props = {
  night: INightRecord;
  setOpen: (arg0: boolean) => void;
}

export default function NightViewFull({night, setOpen}: Props) {

  const classes = useStyles();

  return (
    <div className={classes.divClickable} onClick={(e) => {
      e.preventDefault();
      setOpen(true);
    }}>
      <Grid container>
        <TimeField t={night.bedTime} l="Bedtime:" />
        <TimeField t={night.fellAsleepAt} l="Fell asleep:" />
        <TimeField t={night.wokeUp} l="Woke up at:" />
        <TimeField t={night.gotUp} l="Got up:" />
        <Grid className={classes.field} item xs={12}>
          <Typography className={classes.fieldLabel} variant="body1">
            Rested rating:
            </Typography>
          <Typography className={classes.fieldValue}>
            {night.restedRating}
          </Typography>
        </Grid>
        <Grid className={classes.field} item xs={12}>
          <Typography className={classes.fieldLabel} variant="body1">
            Sleep quality:
            </Typography>
          <Typography className={classes.fieldValue}>
            {night.sleepQuality}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
