import { Overrides } from "@material-ui/core/styles/overrides";
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides'


// ok, this lets me use the custom pickers theme variables. 
type overridesNameToClassKey = { [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P] }

declare module "@material-ui/core/styles/overrides" {
  export interface ComponentNameToClassKey extends overridesNameToClassKey { }
}


