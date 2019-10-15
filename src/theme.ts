import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
// import { DatePicker } from "@material-ui/pickers";
import { orange, deepOrange, lime, lightBlue, green, grey, amber } from '@material-ui/core/colors';


// export default createMuiTheme(options);
export default createMuiTheme({
  spacing: 4,
  palette: {
    type: 'dark',
    background: {
      default: grey[900],
      // default: '#000',
      // paper: "#424242", // documentation theme default, same as default here. 
    },
    // primary: { main: '#b53d00' }
    primary: {
      main: orange[800],
    },
    secondary: { main: amber[500], },
    text: {
      // primary: lime[300],

    }
  },

  // overrides: {
  //   // MuiPickersDatePickerRoot: {
  //   //   toolbar: {
  //   //     backgroundColor: green[100],
  //   //   }
  //   // }
  // },
  // overrides: {
  //   MuiPickersToolbar: {
  //     toolbar: {
  //       backgroundColor: lightBlue.A200,
  //     },
  //   },
  //   MuiPickersModal: {

  //     dialogRoot: {
  //       color: lime["200"],

  //     },
  //     withAdditionalAction: {
  //       color: lime["200"],
  //       backgroundColor: lime[500],
  //     },
  //   },
  //   MuiPickersToolbarButton: {
  //     toolbarBtn: {
  //       color: lime[500],
  //     },
  //   },
  // }
})