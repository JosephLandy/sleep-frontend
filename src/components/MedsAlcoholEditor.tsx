import React from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Fab,
  IconButton
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import TimePropertySelector from './TimePropertySelector';
import { DrugRecord } from '../shared/model';

export type MedsAlcoholHandler = (index: number, property: string, value: string | Date | number | null) => void;

type Props = {
  drugs: Array<DrugRecord>;
  drugsChanged: (drugs: Array<DrugRecord>) => void;
}

export default function MedsAlcoholEditor({ drugs, drugsChanged, }: Props) {

  const drugEdited: MedsAlcoholHandler = (i, prop, value) => {
    const newDrugs = [...drugs];
    newDrugs[i] = { ...newDrugs[i], [prop]: value };
    drugsChanged(newDrugs);
  }

  function drugAdded() {
    drugsChanged([...drugs, {
      substance: '',
      time: null,
    }]);
  }

  function drugDeleted(i: number) {
    const newDrugs = [...drugs.slice(0, i), ...drugs.slice((i + 1))];
    drugsChanged(newDrugs);
  }

  return (
    <ExpansionPanel onBlur={(e) => {
      // maybe submit the update to the containing component when this loses focus.
      // otherwise I feel like this would be continually re-rendered.
    }}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}>
        Medication and Alcohol
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Drug</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drugs.map(({ substance, quantity, time }: DrugRecord, index) => (
              <TableRow key={index}>
                <TableCell>
                  {/* uncontrolled component. For this to work properly, the submit button
                  on the NightEditor must handle it's event after the onBlur event here. Not sure if it is or not. */}
                  <TextField defaultValue={substance} inputProps={{onBlur: (event) => {
                    drugEdited(index, "substance", event.target.value);
                  }}} />
                </TableCell>
                <TableCell>
                  {/* ok, so if there is no value */}
                  <TextField defaultValue={quantity} inputProps={{
                    onBlur: (e) => {
                      // need to make sure this is a number here. And set it to undefined if it's unitless.
                      drugEdited(index, "quantity", e.target.value);
                    }
                  }} />
                </TableCell>
                <TableCell>
                  <TimePropertySelector value={time} property="time" handleChange={(t, property) => {
                    // if time is changed, the med list should be sorted into chronological order.
                    drugEdited(index, property, t);
                  }}/>
                </TableCell>
                <TableCell>
                  <IconButton onClick={e => {
                    drugDeleted(index);
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow >
              <TableCell />
              <TableCell align="center">
                <Fab onClick={e => {
                  drugAdded();
                }}>
                  <AddIcon/>
                </Fab>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
