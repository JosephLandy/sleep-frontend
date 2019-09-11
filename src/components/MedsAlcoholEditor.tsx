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
  TextField
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DateTime } from 'luxon';

import TimePropertySelector from './TimePropertySelector';

import { DrugRecord } from '../model';


export type MedsAlcoholHandler = (index: number, property: string, value: string | DateTime | number | null) => void;

type Props = {
  drugs: Array<DrugRecord>;
  drugEdited: MedsAlcoholHandler;
}

// this could be a higher order component or something for
// different list type editors (such as interruptions). Possibly a typescript generic? 

export default function MedsAlcoholEditor({ drugs, drugEdited }: Props) {
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
                  <TextField value={substance} onChange={e => {
                    drugEdited(index, "substance", e.target.value);
                  }} />
                </TableCell>
                <TableCell>
                  {/* ok, so if there is no value  */}
                  <TextField value={quantity} onChange={e => {
                    drugEdited(index, "quantity", e.target.value);
                  }} />
                </TableCell>
                <TableCell>
                  <TimePropertySelector value={time} label="Time" property="time" handleChange={(t, property) => {
                    // if time is changed, the med list should be sorted into chronological order. 
                    drugEdited(index, property, t);
                  }}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}


export function MedsAlcoholDisplay({ drugs }: Props) {
  return (
    <ExpansionPanel>
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
            {drugs.map((drug, index) => (
              <TableRow key={index}>
                <TableCell>
                  {drug.substance}
                </TableCell>
                <TableCell>
                  {drug.quantity}
                </TableCell>
                <TableCell>
                  {drug.time.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
