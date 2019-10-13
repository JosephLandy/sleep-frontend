import React, { useEffect, useRef } from 'react'

import { VictoryChart, VictoryLine } from 'victory';

type Datum = { x: Date, y: Date };
type Props = {
  data: Datum[];
  start: Date;
  end: Date;
}

const width = 500;
const height = 400;


export default function AnalyticsView({data, start, end}: Props) {
  useEffect(() => {

  })

  // if (data.length === 0) {
  //   return <div></div>
  // }
  return (
    <VictoryChart>
      <VictoryLine data={data} x={(d: Datum) => d.x.valueOf()}
        y={(d: Datum) => d.y.getHours() * 60 + d.y.getMinutes()}/>
    </VictoryChart>
  )
}


