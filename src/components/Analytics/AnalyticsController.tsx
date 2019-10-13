import React, {useEffect, useState} from 'react'

import { Select, Button, MenuItem, FormControl, InputLabel, AppBar, Toolbar, Box } from '@material-ui/core';
import { DatePicker} from '@material-ui/pickers';
import AnalyticsViewVictory from './AnalyticsViewVictory';
import {parseISO, startOfWeek, endOfWeek} from 'date-fns';

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
  const [start, setStart] = useState(startOfWeek(new Date()));
  const [end, setEnd] = useState(endOfWeek(new Date()));
  // const [data, setData] = useState<DateTime[]>([]);
  // const [data, setData] = useState<Array<{dateAwake: DateTime, yvalue: DateTime}>>([])
  const [data, setData] = useState<Array<{ x: Date, y: Date }>>([])
  const [property, setProperty] = useState("");

  function getAnalytics(start: Date, end: Date, property: string) {
    
    const url = `/api/analytics/${property}?start=${start}&end=${end}`;
    fetch(url).then(resp => {
      return resp.json();
    }).then(json => {
      if (Array.isArray(json)) {
        let d = json.map((val) => {return {
          x: parseISO(val['dateAwake']), 
          y: parseISO(val[property]),
        }})
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
      <AnalyticsViewVictory data={data} start={start} end={end} />
    </div>
    
  )
}

export default AnalyticsController;