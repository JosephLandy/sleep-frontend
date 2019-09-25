import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { WeekDay } from '../shared/model';

type Props = {
    value: WeekDay
}

export default function WeekDayPicker({value}: Props) {
    return (
        <FormControl>
            <Select value={value}>
                <MenuItem value={WeekDay.sunday}>{WeekDay.sunday}</MenuItem>
                <MenuItem value={WeekDay.monday}>{WeekDay.monday}</MenuItem>
                <MenuItem value={WeekDay.tuesday}>{WeekDay.tuesday}</MenuItem>
                <MenuItem value={WeekDay.wednesday}>{WeekDay.wednesday}</MenuItem>
            </Select>
        </FormControl>
    );
}