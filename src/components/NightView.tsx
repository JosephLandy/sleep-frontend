import React, {useState} from 'react';
import { Grid, Paper, Box, Fab, Typography, Dialog, } from '@material-ui/core';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import { WeekDay, days, INightRecord } from '../model';
import AddIcon from '@material-ui/icons/Add';
import NightEditor from './NightEditor';
import TextField from '@material-ui/core/TextField';
import { DateTime } from 'luxon';
import { orange } from '@material-ui/core/colors';

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
            height: 500,
            padding: theme.spacing(2),
            textAlign: 'left',
            // textAlign: 'center',
            color: theme.palette.text.secondary,
            display: 'flex',
            flexDirection: "column",

        },
    }),
);

type Props = {
    night: INightRecord;
}

export default function NightView({night}: Props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    function closeEditor() {
        setOpen(false);
    }

    let content;
    if (night.edited) {
        content = (
                <Grid container>
                    <TextField
                        label="Bed time"
                        defaultValue={night.bedTime ? night.bedTime.toISOTime() : null} 
                        InputProps={{readOnly: true,}} 
                    />
                    <Typography display="inline" variant="caption">
                        Fell Asleep at:
                        {night.fellAsleepAt ? night.fellAsleepAt.toLocaleString(DateTime.TIME_24_SIMPLE) : ''}
                    </Typography>
                    <span>
                        {night.fellAsleepAt ? night.fellAsleepAt.toLocaleString(DateTime.TIME_24_SIMPLE) : ''}
                    </span>
                    <Box>
                        <Typography>
                            Fell asleep
                        </Typography>
                        {night.fellAsleepAt ? night.fellAsleepAt.toLocaleString(DateTime.TIME_24_SIMPLE) : ''}
                    </Box>
                </Grid>
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
                    <Fab onClick={() => setOpen(true)}>
                        <AddIcon />
                    </Fab>
                    <Dialog open={open} onClose={closeEditor}>
                        <NightEditor night={night} closeEditor={closeEditor} submit={closeEditor}/>
                    </Dialog>
                </div>
            </Box>
        );
    }
    return (
        <Grid item>
            <Paper className={classes.paper}>
                <Typography variant="h5">
                    {night.day} 
                </Typography>
                <Typography>
                    {night.dateAwake.toLocaleString()}
                </Typography>
                {content}
            </Paper>
        </Grid>
    );
}

function AddRecord() {
    const [open, setOpen] = useState(false);
    return (
        <Box display="flex"
            flexDirection={"column"}
            flexGrow={1}
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Fab>
                <AddIcon />
            </Fab>
        </Box>
    );
}