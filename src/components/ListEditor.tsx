import React from 'react';

import { ExpansionPanel, ExpansionPanelSummary, TableHead, TableRow, TableCell, Table, ExpansionPanelDetails, TableBody } from '@material-ui/core';


type Props<V> = {
  title: string;
  items: Array<V>;
  onChanged: (items: Array<V>) => void;
}

function ListEditor<T> ({items, onChanged, title}: Props<T>) {
  


}