import React, {useState} from 'react';
import { Grid, Paper, Box, Button, Fab, Typography, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import { WeekDay, days, INightRecord } from '../model';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
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


export default function NightView({night}: {night: INightRecord}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    function closeEditor() {
        setOpen(false);
    }

    let content;
    if (night.edited) {
        content = (
            <Box display="flex" flexDirection={"column"} flexGrow={1} justifyContent="space-evenly">
                <Button>meow</Button>
                <Button>woof</Button>
                <Button>quack</Button>
                <Button>moo</Button>
            </Box>
        );
    } else {
        content = (
            <Box display="flex" 
                flexDirection={"column"} 
                flexGrow={1} 
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Fab onClick={() => setOpen(true)}>
                    <AddIcon />
                </Fab>
                <Dialog open={open} onClose={closeEditor}>
                    <DialogTitle>
                        Edit Night Record
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => closeEditor()}>Cancel</Button>
                        <Button onClick={() => closeEditor()}>Submit</Button>
                    </DialogActions>
                </Dialog>
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
                    {night.date_awake.toLocaleString()}
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