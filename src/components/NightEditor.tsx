import React, { useState } from 'react';
import { INightRecord } from '../model';
import {TimePicker} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DialogActions, Button, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem,Grid,
} from '@material-ui/core';
import { DateTime, } from 'luxon';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green, orange, blue, red, } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ratingCell: {
            backgroundColor: green[200],
        },
        containerGrid: {
            backgroundColor: orange[200],
        },
        ratingControl: {
            minWidth: 110,
        }
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
    }

    const handleRatingChange: RatingChangeHandler = (e) => {
        setEdits(oldEdits => ({
            ...oldEdits,
            [e.target.name as string]: e.target.value,
        }));
    }

    type TimeSelectorProps = {
        label: string;
        property: string;
        value: DateTime | null | undefined;
    };

    function TimePropertySelector({label, property, value}: TimeSelectorProps) {
        return (
            <TimePicker
                value={value ? value : null}
                id={`${night.day}-${property}-picker`}
                clearable
                label={label}
                // mask="__:__"
                // placeholder="8:00 AM"
                onChange={t => {
                    handleTimeChange(t, property);
                }}
            />
        );
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
                <Grid className={classes.containerGrid} container spacing={2}>
                {/* <Grid container spacing={0} direction="column"> */}

                    <Grid item xs={6}>                    
                    <TimePropertySelector label="Went to bed at" property="bedTime" value={edits.bedTime} />
                    </Grid>

                    <Grid item xs={6}>    
                    <TimePropertySelector label="Fell asleep at" property="fellAsleepAt" value={edits.fellAsleepAt} />
                    </Grid>

                    <Grid item xs={6}>                    
                    <TimePropertySelector label="Woke up at" property="wokeUp" value={edits.wokeUp} />
                    </Grid>

                    <Grid item className={classes.ratingCell} xs={6}>
                        <RatingSelect value={edits.restedRating}
                            label="Rested rating"
                            name="restedRating"
                            handleChange={handleRatingChange}
                        />
                    </Grid>
                    
                    <Grid item className={classes.ratingCell} xs={6}>
                        <RatingSelect value={edits.sleepQuality}
                            label="Sleep quality"
                            name="sleepQuality"
                            handleChange={handleRatingChange}
                        />
                    </Grid>

                    
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

type RatingChangeHandler = React.ChangeEventHandler<{
    name?: string | undefined;
    value: unknown;
}>;

type RatingSelectProps = {
    value: string;
    label: string;
    name: string;
    handleChange: RatingChangeHandler;
    
}

function RatingSelect({value, name, label, handleChange}: RatingSelectProps) {
    const classes = useStyles();
    return (
        <FormControl className={classes.ratingControl}>
            <InputLabel htmlFor={`${name}-rating`}>{label}</InputLabel>
            <Select
                value={value}
                onChange={handleChange}
                inputProps={{
                    name,
                    id: `${name}-rating`,
                }}
            >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>
        </FormControl>
    );
}

type TimeSelectorProps2 = {
    label: string;
    property: string;
    value: DateTime | null | undefined;
};

function TimePropertySelector2({ value, label, property,  }: TimeSelectorProps2) {
    return (
        <TimePicker
            value={value ? value : null}
            // id={`${night.day}-${property}-picker`}
            id={`${property}-picker`}
            clearable
            label={label}
            // mask="__:__"
            // placeholder="8:00 AM"
            onChange={t => {
                handleTimeChange(t, property);
            }}
        />
    );
}