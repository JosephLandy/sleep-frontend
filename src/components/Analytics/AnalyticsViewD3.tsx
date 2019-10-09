import React, { useEffect, useRef } from 'react'
import { DateTime } from 'luxon'
import * as d3 from 'd3';

type Props = {
  data: DateTime[];
  start: DateTime;
  end: DateTime;
}

const width = 500;
const height = 400;


export default function AnalyticsView({data, start, end}: Props) {
  const d3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const svg = d3.select(d3Ref.current).append("svg").attr('width', width).attr('height', height);
    // svg.append('rect').attr('width', 200).attr('height', 200);

    // const x = d3.scaleTime().domain([start.toJSDate(), end.toJSDate()]).range([0, width]);
    // svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    // set the dimensions and margins of the graph
    let margin = { top: 10, right: 30, bottom: 30, left: 60 };
    let width = 460 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    const svg = d3.select(d3Ref.current)
      .append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g').attr('transform', `translate(${margin.left},${margin.top})`); // Ok, this g is within the graph area. 

    const dataurl = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv";
    d3.csv<{date: Date, value: string}, "date" | "value">(dataurl, ({date, value}) => {
      date = (date as string);
      value = (value as string);
      return {
        date: (d3.timeParse("%Y-%m-%d")(date) as Date),
        value,
      }
    }).then((data) => {
      let x = d3.scaleTime()
        .domain((d3.extent(data, (d) => d.date ) as Date[]))
        .range([0, width]);

      let y = d3.scaleLinear()
        .domain([0, (d3.max(data, (d) => +d.value) as number)])
        .range([height, 0]);

      // I think this starts at the end of the main area. Start of the bottom margin is 
      // the g's origin, to draw the bottom axis on the margin area. 
      svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));
      // already at top left corner, don't need to transform it. 
      svg.append('g').call(d3.axisLeft(y));

      svg.append('path').datum(data).attr('fill', 'none').attr('stroke', 'green').attr('stroke-width', 1.5)
        .attr('d', d3.line<{date: Date, value: string}>()
            .x((d) => x(d.date)).y(d => y(+d.value))
        );

    })

    
    
  })

  return (
    <div ref={d3Ref}>

    </div>
  );
}


