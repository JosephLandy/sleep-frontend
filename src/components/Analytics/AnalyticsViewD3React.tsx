import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import { INightRecord } from '../../shared/model';
import endOfDay from 'date-fns/endOfDay';
import * as dt from 'date-fns';

type Props = {
  // data: Date[];
  data: {
    dateAwake: Date;
    value: Date;
  }[];
  start: Date;
  end: Date;
}

// const width = 500;
// const height = 400;

export default function AnalyticsView({ data, start, end }: Props) {
  const d3Ref = useRef<HTMLDivElement>(null);

  if (data.length === 0) {
    return <div></div>
  }
  let margin = { top: 60, right: 60, bottom: 60, left: 60 };
  let width = 600 - margin.left - margin.right;
  let height = 600 - margin.top - margin.bottom;

  

  useEffect(() => {
    // ok, my version. 
    if (data.length > 0) {
      // set the dimensions and margins of the graph
      let margin = { top: 60, right: 60, bottom: 60, left: 60 };
      let width = 600 - margin.left - margin.right;
      let height = 600 - margin.top - margin.bottom;

      const svg = d3.select(d3Ref.current)
        .append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g').attr('transform', `translate(${margin.left},${margin.top})`); // Ok, this g is within the graph area. 

      svg.append('rect').attr('width', width).attr('height', height).attr('fill', '#555');

      const x = d3.scaleTime().domain([start, end]).range([0, width]);


      const rangeStart = dt.startOfDay(data[0].value);
      const rangeEnd = dt.endOfDay(rangeStart);

      const ydomain = d3.extent<{ dateAwake: Date, value: Date }, Date>(data, ({ dateAwake, value }) => value);

      // set range in reverse direction to orient increasing values upwards. 
      const y = d3.scaleTime()
        .domain(ydomain as Date[])
        // .domain([rangeStart, rangeEnd])
        .range([height, 0]);

      svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
      svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
      svg.append('g').call(d3.axisLeft(y));

      svg.append('path').datum(data)
        .attr('stroke', 'green')
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .attr('d',
          d3.line<{ dateAwake: Date, value: Date }>().x(d => x(d.dateAwake)).y(d => y(d.value)));

    }
  });

  return (
    <div ref={d3Ref}>

    </div>
  );
}


