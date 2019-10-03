import React from 'react';
import { IntRecord } from '../shared/model';
import { ExpansionPanel, ExpansionPanelSummary, TableHead, TableRow, TableCell, Table, ExpansionPanelDetails, TableBody } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from 'material-ui';


type Props = {
  ints: Array<IntRecord>;
  intsChanged: (ints: IntRecord[]) => void;
}

export default function InterruptionsEditor({ints, intsChanged}: Props) {
  
  function added() {

  }
  function deleted(i: number) {

  }

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        Interruptions
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Duration (mins)
              </TableCell>
              <TableCell>
                Notes
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ints.map(({duration, notes}: IntRecord, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField defaultValue={duration.minutes} />
                </TableCell>
                <TableCell>
                  <TextField defaultValue={notes} />
                </TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </ExpansionPanelDetails>

    </ExpansionPanel>
  )

}
