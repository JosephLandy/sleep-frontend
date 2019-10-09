import React, {useEffect, useState} from 'react'

import { Select, Button, MenuItem, FormControl, InputLabel, AppBar, Toolbar, Box } from '@material-ui/core';
import { DatePicker} from '@material-ui/pickers';
import { DateTime } from 'luxon'
import AnalyticsViewVictory from './AnalyticsViewVictory';

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

// function getAnalytics(start: DateTime, end: DateTime) {
//   const property = 'wokeUp';
//   const url = `/api/analytics/${property}?start=${start}&end=${end}`;
//   fetch(url).then(resp => {
//     console.log(resp.statusText);
//     return resp.json();
//   }).then(json => {
//     console.dir(json);
//   }).catch(e => {
//     console.error(e);
//   })
// }


function processData<T = string>(raw: object[], property: string) {
  if (raw.length === 0) {
    return raw;
  }
  return raw.map((value: any) => {
    return {dateAwake: DateTime.fromISO(value.dateAwake), [property]: DateTime.fromISO(value[property])};
  })

}


export const AnalyticsController: React.FC<Props> = () => {
  const [start, setStart] = useState(DateTime.local().startOf('week'));
  const [end, setEnd] = useState(DateTime.local().endOf('week'));
  // const [data, setData] = useState<DateTime[]>([]);
  // const [data, setData] = useState<Array<{dateAwake: DateTime, yvalue: DateTime}>>([])
  const [data, setData] = useState<Array<{ x: DateTime, y: DateTime }>>([])
  const [property, setProperty] = useState("");

  function getAnalytics(start: DateTime, end: DateTime, property: string) {
    // const property = 'wokeUp';
    const url = `/api/analytics/${property}?start=${start}&end=${end}`;
    fetch(url).then(resp => {
      // console.log(resp.statusText);
      return resp.json();
    }).then(json => {
      if (Array.isArray(json)) {
        let d = json.map((val) => {return {
          x: DateTime.fromISO(val['dateAwake']), 
          y: DateTime.fromISO(val[property]),
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