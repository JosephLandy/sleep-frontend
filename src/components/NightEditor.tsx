import React, { useState } from 'react';
import { INightRecord } from '../model';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DialogActions, Button, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem,Grid,
} from '@material-ui/core';
import { DateTime, } from 'luxon';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green, orange, red } from '@material-ui/core/colors';

import RatingSelect from './RatingSelect';
import TimePropertySelector from './TimePropertySelector';

import MedsAlcoholEditor, {MedsAlcoholHandler} from './MedsAlcoholEditor';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ratingCell1: {
            backgroundColor: green[200],
        },
        ratingCell2: {
            backgroundColor: orange[200],
        },
        containerGrid: {
            flexGrow: 1,
            backgroundColor: red[200],
        },
    })
);


type NightEditorProps = {
    night: INightRecord;
    closeEditor: () => void;
    submit: () => void;
};

export default function NightEditor({ night, closeEditor, submit }: NightEditorProps) {
    // for the time being, this is a suitable deepcopy. Change when it gets 
    // more complicated.
    const [edits, setEdits] = useState<INightRecord>({ ...night });

    const [drugsEdits, setDrugsEdits] = useState([...night.medsAndAlcohol]);


    const classes = useStyles();

    const handleTimeChange = (t: DateTime | null, property: string) => {
        if (t) {
            setEdits(oldEdits => ({
                ...oldEdits,
                [property]: t,
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

    const handleDrugsChange: MedsAlcoholHandler = (i, prop, value) => {
      const newDrugs = [...drugsEdits];
      newDrugs[i] = {...newDrugs[i], [prop]: value};
      setDrugsEdits(newDrugs);

      console.log('editing drugs')
    }

    return (
        <form onKeyPress={(event) => {
            // console.log(event.key);
            if (event.key === "Enter") {
                event.preventDefault();
                submit();
            }
        }}>
            <DialogTitle>
                Edit Night Record
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {night.dateAwake.toLocaleString()}
                </DialogContentText>
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

                    <Grid item xs={12} className={classes.containerGrid} container spacing={3} direction="row">
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
                    <MedsAlcoholEditor drugs={drugsEdits} drugEdited={handleDrugsChange} />
                </Grid>   
            </DialogContent>
            <DialogActions>
                <Button onClick={() => closeEditor()}>
                    Cancel
                </Button>
                <Button onClick={() => submit()}>
                    Submit
                </Button>
            </DialogActions>
        </form>
    );
}