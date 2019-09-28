import React, {useEffect, useState} from 'react'
import { DateTime } from 'luxon';

import {NightRecord, IWeekRecord, populateWeek} from '../shared/model';

type Props = {
  nightInWeek: DateTime;
}

export default function WeekContainer({nightInWeek}: Props) {
  // const [loaded, setLoaded] = useState(false);
  // const [nights, setNights] = useState<NightRecord[]>([]);

  const [week, setWeek] = useState<IWeekRecord>({weekOf: nightInWeek.startOf('week'),nights: [], loaded: false});
  // passing empty array of dependencies tells react that the effect never
  // needs to run more than once. Makes it effectively a componentDidMount.
  
  // get the initial record of the week from the server. 
  // don't need to get data again unless the week is changed.
  useEffect(() => {
    getWeek();
  }, []);

  function getWeek() {
    const url = `/api/weeks/${week.weekOf.toISO()}`;
    fetch(url).then(resp => {
      if (resp.ok) {
        resp.json().then(jsonArray => {
          if (Array.isArray(jsonArray) && jsonArray.length > 0) {
            let nights = jsonArray.map((val) => NightRecord.fromSerial(val));
            nights = padNights(week.weekOf, nights);
            setWeek({
              weekOf: week.weekOf,
              nights,
              loaded: true,
            });
          }
        });
      } else if (resp.status === 404) {
        setWeek(populateWeek(week.weekOf));
      } else {
        console.log(resp.status);
      }
    });
  }

  return (
    <div>
      
    </div>
  );
}

/**
 * If there are fewer than 7 nights in the passed array, 
 * return a new array in weekday order padding out initial
 * nights with empty ones in order for any weekdays that might 
 * be missing. 
 * @param ns array of nights in week
 */
function padNights(weekStart: DateTime, nightsInit: NightRecord[]) {
  if (nightsInit.length === 7) {
    return nightsInit;
  }
  let out: NightRecord[] = new Array<NightRecord>(7);
  for (let i = 0; i < out.length; i++) {
    if (nightsInit[0] && i === nightsInit[0].dateAwake.weekday - 1) {
      out[i] = nightsInit.shift();
    } else {
      out[i] = new NightRecord(weekStart.plus({days: i}));
    }
  }
  return out;
}

