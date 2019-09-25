import React from 'react';
import { TimePicker } from '@material-ui/pickers';
import { DateTime, } from 'luxon';

// handleChange should accept undefined. 
type TimeSelectorProps = {
    label: string;
    property: string;
    value: DateTime | null | undefined;
    handleChange: (t: DateTime | null, property: string) => void;
};

// annoyingly, the time picker component does not use a compatible onChange definition with the 
// Select component, hence I'm adding a layer of abstraction. 
// I don't really save that much space by breaking this out into it's own component like this
// I think it simplifies the logic though. 

export default function TimePropertySelector({ value, label, property, handleChange }: TimeSelectorProps) {
    return (
        <TimePicker
            value={value ? value : null}
            id={`${property}-picker`}
            clearable
            label={label}
            // mask="__:__"
            // placeholder="8:00 AM"
            onChange={t => {
                handleChange(t, property);
            }}
        />
    );
}