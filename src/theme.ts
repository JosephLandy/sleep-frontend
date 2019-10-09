import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
// import { DatePicker } from "@material-ui/pickers";
import { orange, deepOrange, lime, lightBlue, green } from '@material-ui/core/colors';
// import { orange400 } from 'material-ui/styles/colors';

// const palette = {
//     // primary: { main: '#673AB7' },
//     secondary: { main: '#8BC34A', contrastText: '#000000' }
// };
// const themeName = 'Purple Heart Sushi Bettong';

// const options = {
//     palette: {
//         primary: { main: '#673AB7' },
//         secondary: { main: '#8BC34A', contrastText: '#000000' }
//     },
//     themeName: themeName,
// // }
// const options: ThemeOptions = {
//     palette: {
//         type: "dark",
//         primary: {
//           main: orange[200],
//         }
//     },
// };

// this is working terribly! But I think the best solution might be to use a nested theme. 

// export default createMuiTheme(options);
export default createMuiTheme({
  spacing: 4,
  palette: {
    type: 'dark',
    secondary: { main: '#64dd17' },
    // secondary: { main: '#424242' },
    primary: { main: '#b53d00' }

    // primary: { main: '#424242' },
    // secondary: { main: '#FFAB00' }
  },
  overrides: {
    // MuiPickersDatePickerRoot: {
    //   toolbar: {
    //     backgroundColor: green[100],
    //   }
    // }
  },
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