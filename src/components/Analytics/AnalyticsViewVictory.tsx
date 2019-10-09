import React, { useEffect, useRef } from 'react'
import { DateTime } from 'luxon'
import { VictoryChart, VictoryLine } from 'victory';

type Datum = { x: DateTime, y: DateTime };
type Props = {
  data: Datum[];
  start: DateTime;
  end: DateTime;
}

const width = 500;
const height = 400;


export default function AnalyticsView({data, start, end}: Props) {
  // const d3Ref = useRef<HTMLDivElement>(null);

  
  useEffect(() => {

  })

  // if (data.length === 0) {
  //   return <div></div>
  // }


  return (
    <VictoryChart>
      <VictoryLine data={data} x={(d: Datum) => d.x.toMillis()}
        y={(d: Datum) => d.y.hour * 60 + d.y.minute}/>
    </VictoryChart>
  )
}


