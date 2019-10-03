import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

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
// }
const options: ThemeOptions = {
    palette: {
        type: "dark",
    },
};

export default createMuiTheme(options);