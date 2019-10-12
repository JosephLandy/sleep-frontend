import React, { useState } from 'react';
import { Grid, Paper, Box, Fab, Typography, Dialog, Divider, } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { INightRecord } from '../../shared/model';
import AddIcon from '@material-ui/icons/Add';
import NightEditor from '../NightEditor';
// import TextField from '@material-ui/core/TextField';
import {format} from 'date-fns';

import NightViewFull from './NightViewFull';
// import MedsAlcoholView from './MedsAlcoholView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      // margin: theme.spacing(0),
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
  }),
);

export type NVProps = {
  night: INightRecord;
  nightUpdated: (newNight: INightRecord) => void;
}

export default function NightView({ night, nightUpdated }: NVProps) {

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
    content = <NightViewFull night={night} setOpen={setOpen}/>
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
            {format(night.dateAwake, 'EEEE')}
          </Typography>
          <Typography>
            {/* {night.dateAwake.toLocaleDateString({ month: 'long', day: 'numeric', })} */}
            {format(night.dateAwake, 'MMMM do')}
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

