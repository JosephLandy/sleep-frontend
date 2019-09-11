import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    InputLabel, MenuItem,
} from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green, orange, } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ratingCell: {
            backgroundColor: green[200],
        },
        containerGrid: {
            backgroundColor: orange[200],
        },
        ratingControl: {
            minWidth: 120,
        }
    })
);

type RatingChangeHandler = React.ChangeEventHandler<{
    name?: string | undefined;
    value: unknown;
}>;

type Props = {
    value: string;
    label: string;
    name: string;
    handleChange: RatingChangeHandler;
}

export default function RatingSelect({ value, name, label, handleChange }: Props) {

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