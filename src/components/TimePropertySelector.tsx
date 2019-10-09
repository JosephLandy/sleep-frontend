import React from 'react';
import { TimePicker } from '@material-ui/pickers';
import { DateTime, } from 'luxon';

// import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
// import { lime, orange } from '@material-ui/core/colors';
// import { ThemeProvider } from '@material-ui/styles';

// const theme = createMuiTheme({
//   palette: {
//     type: "dark",
//     primary: {
//       main: orange[200],
//     }
//   },
//   // overrides: {
//   //   MuiPickersToolbar: {
//   //     toolbar: {
//   //       backgroundColor: lightBlue.A200,
//   //     },
//   //   },
//   //   MuiPickersModal: {

//   //     dialogRoot: {
//   //       color: lime["200"],

//   //     },
//   //     withAdditionalAction: {
//   //       color: lime["200"],
//   //       backgroundColor: lime[500],


//   //     },
//   //   },
//   //   MuiPickersToolbarButton: {
//   //     toolbarBtn: {
//   //       color: lime[500],
//   //     },
//   //   },
//   // }
// });

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

// ok: I think the low contrast light color on the toolbar is #3F50B5 This looks like it approximately corresponds
// to pallette.primary.main on the default theme. 
// That worked, but the material-ui pickers have custom stuff added to them to override just their display values. in the theme.
// interestingly, you can't actually change them with css. 
// https://material-ui-pickers.dev/guides/css-overrides
// the pickers overrides work terribly. I'm going to try making a nested theme instead. 
// In general, the theme shouldn't use blue at all. 
export default function TimePropertySelector({ value, label, property, handleChange }: TimeSelectorProps) {
    return (
      // <ThemeProvider theme={theme}>
      // </ThemeProvider>
      <TimePicker
        value={value ? value : null}
        id={`${property}-picker`}
        clearable
        label={label}
        ampm={false}
        // mask="__:__"
        // placeholder="8:00 AM"
        onChange={t => {
          handleChange(t, property);
        }}
      />
        
    );
}