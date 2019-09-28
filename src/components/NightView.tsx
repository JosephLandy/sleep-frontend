import React, { useState } from 'react';
import { Grid, Paper, Box, Fab, Typography, Dialog, Divider, } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { INightRecord } from '../shared/model';
import AddIcon from '@material-ui/icons/Add';
import NightEditor from './NightEditor';
import TextField from '@material-ui/core/TextField';
import { DateTime, LocaleOptions } from 'luxon';
import { orange } from '@material-ui/core/colors';

import MedsAlcoholView from './MedsAlcoholView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    editedBox: {
      backgroundColor: orange[900],
    },
    paper: {
      width: 200,
      // width: 250,
      height: 500,
      padding: theme.spacing(2),
      textAlign: 'left',
      // textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: "column",
    },
    fieldLabel: {
      display: 'inline',
      textDecoration: 'underline',
    },
    fieldValue: {
      display: 'inline',
      float: "right",
    }
  }),
);

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
  
  if (night.edited) {
    // remember: stopPropagation, to keep events from propagating up to parents. 
    content = (
      <Paper className={classes.paper} onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }}>
        <div>
          <Typography variant="h5">
            {night.dateAwake.weekdayLong}
          </Typography>
          <Typography>
            {night.dateAwake.toLocaleString({ month: 'long', day: 'numeric', })}
          </Typography>
        </div>
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.fieldLabel} variant="body2">Bedtime:</Typography>
            <Typography className={classes.fieldValue}>
              {` ${night.bedTime ? night.bedTime.toLocaleString(DateTime.TIME_24_SIMPLE) : ''}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.fieldLabel} variant="body2">Fell asleep:</Typography>
            <Typography className={classes.fieldValue}>
              {` ${night.fellAsleepAt ? night.fellAsleepAt.toLocaleString(DateTime.TIME_24_SIMPLE) : ''}`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    content = (
      <Paper className={classes.paper}>
        <Typography variant="h5">
          {night.dateAwake.weekdayLong}
        </Typography>
        <Typography>
          {night.dateAwake.toLocaleString()}
        </Typography>
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
      </Paper>
    );
  }

  return (
    <Grid item>
      {content}
      <Dialog open={open} onClose={closeEditor} scroll="paper" keepMounted>
        <NightEditor night={night} closeEditor={closeEditor} submit={submit} />
      </Dialog>
    </Grid>
  );
}

