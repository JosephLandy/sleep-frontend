import React, {useEffect, useState} from 'react'

import { Select, Button, MenuItem, FormControl, InputLabel, AppBar, Toolbar, Box } from '@material-ui/core';
import { DatePicker} from '@material-ui/pickers';
// import AnalyticsViewVictory from './AnalyticsViewVictory';
import AnalyticsView from './AnalyticsViewD3';
import {parseISO, startOfWeek, endOfWeek} from 'date-fns';
import * as dt from 'date-fns';

interface Props {

}

// interface State {
//   start: DateTime;
//   end: DateTime;
//   data: null | 
// }

const properties = [
  "bedTime",
  "fellAsleepAt",
  "wokeUp",
  "gotUp",
]

function processData<T = string>(raw: object[], property: string) {
  if (raw.length === 0) {
    return raw;
  }
  return raw.map((value: any) => {
    return {dateAwake: parseISO(value.dateAwake), [property]: parseISO(value[property])};
  })

}


export const AnalyticsController: React.FC<Props> = () => {
  const [start, setStart] = useState(dt.subMonths(startOfWeek(new Date()), 2));
  const [end, setEnd] = useState(new Date());
  // const [data, setData] = useState<DateTime[]>([]);
  // const [data, setData] = useState<Array<{dateAwake: DateTime, yvalue: DateTime}>>([])
  const [data, setData] = useState<Array<{ dateAwake: Date, value: Date }>>([])
  const [property, setProperty] = useState("");

  function getAnalytics(start: Date, end: Date, property: string) {
    const url = `/api/analytics/${property}?start=${start.toISOString()}&end=${end.toISOString()}`;
    fetch(url).then(resp => {
      return resp.json();
    }).then(json => {
      console.log(json);
      if (Array.isArray(json)) {
        let d = json.map((val) => {
          return {
            dateAwake: parseISO(val['dateAwake']), 
            value: parseISO(val[property]),
          }
        });
        setData(d);
      }
    }).catch(e => {
      console.error(e);
    })
  }

  return (
    <div>
      <Box display="flex" >
        <DatePicker value={start} label="Start" onChange={(date) => {
          if (date) {
            setStart(date);
          }
        }} />
        <DatePicker value={end} label="End" onChange={(date) => {
          if (date) {
            setEnd(date);
          }
        }} />
        <FormControl>
          <InputLabel htmlFor="property-selector">Property</InputLabel>
          <Select value={property} inputProps={{ id: 'property-selector' }} onChange={(e) => {
            setProperty(e.target.value as string);
          }}>
            {
              [properties.map((value, index) => (
                <MenuItem key={index} value={value}>{value}</MenuItem>
              ))]
            }
          </Select>

        </FormControl>

        <Button onClick={() => {
          getAnalytics(start, end, property);
        }}>
          Generate Graph
        </Button>
      </Box>
      <AnalyticsView data={data} start={start} end={end} />
    </div>
    
  )
}

export default AnalyticsController;