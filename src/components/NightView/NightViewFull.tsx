import React from 'react';
import { Grid, Box, Typography,} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { INightRecord } from '../../shared/model';
import { format } from 'date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divClickable: {
      width: "100%",
      height: "100%",
      padding: 10,
    },
    field: {
      marginBottom: 12,
    },
    field2: {
      marginBottom: 12,
      display: 'flex',
      justifyContent: 'space-between',
    },
    rootGrid: {
      // margin: 20,
    },
    timefield: {
      // borderBottom: 1,
      // borderWidth: 4,
      // borderColor: theme.palette.secondary.main,
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
  t?: Date;
  l: string;
}
export function TimeField({ t, l }: TFProps) {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.field}>
      <Box display="flex">
        <Typography variant="body1">{l}</Typography>
        {/* <Box flexGrow={1} borderBottom={1} borderColor="primary.main"> */}
        <Box flexGrow={1}>
          <Typography align="right" variant="body1">
            {` ${t ? format(t, 'hh:mm a') : ''}`}
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
      <Grid container className={classes.rootGrid}>
        <TimeField t={night.bedTime} l="Bedtime:" />
        <TimeField t={night.fellAsleepAt} l="Fell asleep:" />
        <TimeField t={night.wokeUp} l="Woke up at:" />
        <TimeField t={night.gotUp} l="Got up:" />
        <Grid item className={classes.field2}  xs={12}>
          <Typography className={classes.fieldLabel} variant="body1">
            Rested rating:
          </Typography>
          <Typography className={classes.fieldValue}>
            {night.restedRating}
          </Typography>
        </Grid>
        <Grid item className={classes.field2}  xs={12}>
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
