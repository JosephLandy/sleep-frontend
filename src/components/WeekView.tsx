import React, { useState } from 'react';
import { Grid, Button, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { days, IWeekRecord, } from '../model';
import NightView from './NightView';
import {DateTime} from 'luxon';

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

export default function ({weekinput}: WeekProps) {
    // const classes = useStyles();

    const [open, setOpen] = useState(false);
    // I think because I have to keep state somewhere right now, I'm going to
    // just store the props into state. Apparently it's ok to use props
    // to initialize state. Sort of. Maybe. 
    const [week, setWeek] = useState(weekinput);

    function closeEditor() {
        setOpen(false);
    }

    return (
        <div>
            <h2>
                {`week of ${week.weekOf.toLocaleString(DateTime.DATE_FULL)}`}
            </h2>
            <Grid container justify="center">
                {days.map(day => {
                    return <NightView key={day} night={week.nights[day]} />
                })}
            </Grid>
            <Button onClick={() => setOpen(true)}>Open dialog</Button>

            <Dialog open={open} onClose={closeEditor}>
                <DialogTitle>
                    dialogue
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => closeEditor()}>Cancel</Button>
                    <Button onClick={() => closeEditor()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}