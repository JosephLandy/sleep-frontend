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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { DateTime } from 'luxon';

import { DrugRecord } from '../model';



type Props = {
  drugs: Array<DrugRecord>;
}


export default function MedsAlcoholView({ drugs }: Props) {

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
            {drugs.map(({ substance, quantity, time }: DrugRecord, index) => (
              <TableRow key={index}>
                {/* <TableCell>
                  <Typography>{substance}</Typography>
                </TableCell> */}
                <TableCell>{substance}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{time ? time.toLocaleString(DateTime.TIME_SIMPLE) : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
