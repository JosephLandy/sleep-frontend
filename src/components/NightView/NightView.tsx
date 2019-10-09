import React, { useState } from 'react';
import { Grid, Paper, Box, Fab, Typography, Dialog, Divider, } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { INightRecord } from '../../shared/model';
import AddIcon from '@material-ui/icons/Add';
import NightEditor from '../NightEditor';
// import TextField from '@material-ui/core/TextField';
import { DateTime } from 'luxon';
// import { orange } from '@material-ui/core/colors';

// import MedsAlcoholView from './MedsAlcoholView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      // margin: theme.spacing(2),
    },
    paper: {
      width: 220,
      // width: 250,
      height: 500,
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: "column",
    },
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
export function TimeField({t, l}: TFProps) {
  const classes = useStyles();
  return (
    // <Grid item xs={12} className={classes.field}>
      <Grid item xs={12} className={classes.field}>
      {/* <Box borderBottom={1} borderColor="primary.main"> */}
        <Box display="flex">
          <Typography className={classes.fieldLabel} variant="body1">{l}</Typography>
          <Box flexGrow={1} borderBottom={1} borderColor="primary.main">
            <Typography className={classes.fieldValue} align="right" variant="body1">
              {` ${t ? t.toLocaleString(DateTime.TIME_SIMPLE) : ''}`}
            </Typography>
          </Box>
        </Box>
        {/* <Typography className={classes.fieldLabel} variant="body1">{l}</Typography>
        <Box display="inline" bgcolor="secondary.main">
          <Typography className={classes.fieldValue} align="right" variant="body1">
            {` ${t ? t.toLocaleString(DateTime.TIME_24_SIMPLE) : ''}`}
          </Typography>
        </Box> */}
       

      {/* </Box> */}
      
    </Grid>
  );
}

type Props = {
  night: INightRecord;
  nightUpdated: (newNight: INightRecord) => void;
}

export default function NightView({ night, nightUpdated }: Props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function closeEditor() {
    setOpen(false);
  }

  function submit(nightData: INightRecord) {
    nightUpdated(nightData);
    setOpen(false);
  }
  let content;
  
  // I should just break these out into new components this is too much. 
  if (night.edited) {
    // remember: stopPropagation, to keep events from propagating up to parents. 
    content = (
      <div className={classes.divClickable} onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }}>
        <Grid container>
          <TimeField t={night.bedTime} l="Bedtime:"/>
          <TimeField t={night.fellAsleepAt} l="Fell asleep:"/>
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
    );
  } else {
    content = (
      <Box display="flex"
        flexDirection={"column"}
        flexGrow={1}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <div>
          <Fab onClick={() => { setOpen(true) }}>
            <AddIcon />
          </Fab>
        </div>
      </Box>
    );
  }

  return (
    <Grid className={classes.main} item>
      <Paper className={classes.paper}>
        <div>
          <Typography variant="h5">
            {night.dateAwake.weekdayLong}
          </Typography>
          <Typography>
            {night.dateAwake.toLocaleString({ month: 'long', day: 'numeric', })}
          </Typography>
        </div>
        <Divider />
        {content}
      </Paper>
      
      <Dialog open={open} onClose={closeEditor} scroll="paper">
        <NightEditor night={night} closeEditor={closeEditor} submit={submit} />
      </Dialog>
    </Grid>
  );
}

