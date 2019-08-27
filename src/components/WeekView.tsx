import React, { SyntheticEvent, useState } from 'react';
import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { days, IWeekRecord, WeekDay } from '../model';
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
    week: IWeekRecord
};

export default function ({week}: WeekProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    function handleNightEditorOpen(day: WeekDay, e: SyntheticEvent) {
        e.preventDefault();

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
            <Dialog open={open}>

            </Dialog>
        </div>
    );
}