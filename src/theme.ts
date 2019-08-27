import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#673AB7' },
    secondary: { main: '#8BC34A', contrastText: '#000000' }
};
const themeName = 'Purple Heart Sushi Bettong';

// const options = {
//     palette: {
//         primary: { main: '#673AB7' },
//         secondary: { main: '#8BC34A', contrastText: '#000000' }
//     },
//     themeName: themeName,
// }
const options = {
    palette,
    themeName,
}

export default createMuiTheme(options);