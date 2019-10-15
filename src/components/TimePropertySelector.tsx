import React from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';


// handleChange should accept undefined. 
type TimeSelectorProps = {
    label?: string;
    property: string;
    value: Date | null | undefined;
    handleChange: (t: Date | null, property: string) => void;
};

// annoyingly, the time picker component does not use a compatible onChange definition with the 
// Select component, hence I'm adding a layer of abstraction. 
// I don't really save that much space by breaking this out into it's own component like this
// I think it simplifies the logic though. 

// ok: I think the low contrast light color on the toolbar is #3F50B5 This looks like it approximately corresponds
// to pallette.primary.main on the default theme. 
// That worked, but the material-ui pickers have custom stuff added to them to override just their display values. in the theme.
// interestingly, you can't actually change them with css. 
// https://material-ui-pickers.dev/guides/css-overrides
// the pickers overrides work terribly. I'm going to try making a nested theme instead. 
// In general, the theme shouldn't use blue at all. 
export default function TimePropertySelector({ value, label, property, handleChange, ...rest }: TimeSelectorProps) {
    return (
      // <ThemeProvider theme={theme}>
      // </ThemeProvider>
      <KeyboardTimePicker
        value={value ? value : null} 
        // undefined is included in the ParseableDate definition, but if it's undefined,
        // the picker defaults to showing the current time. Needs to make sure the value
        // is null.
        id={`${property}-picker`}
        clearable
        label={label}
        // ampm={false}
        fullWidth
        mask="__:__ _M"
        // placeholder="8:00 AM"
        onChange={t => {
          handleChange(t, property);
        }}
        {...rest}
      />
    );
}