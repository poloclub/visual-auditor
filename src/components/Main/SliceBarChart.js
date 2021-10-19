import { useD3 } from '../../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function SliceBarChart({ data }) {
  const ref = useD3(
    (svg) => {
      const height = 600;
      const width = 875;
      const margin = { top: 20, right: 30, bottom: 100, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.slice))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.metric)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0))
          .selectAll('text')
          .attr('transform', 'translate(-10,0)rotate(-45)')
          .style('text-anchor', 'end');

      const y1Axis = (g) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .style('color', 'steelblue')
          .call(d3.axisLeft(y1).ticks(null, 's'))
          .call((g) => g.select('.domain').remove())
          .call((g) =>
            g
              .append('text')
              .attr('x', -margin.left)
              .attr('y', 10)
              .attr('fill', 'currentColor')
              .attr('text-anchor', 'start')
              .text(data.y1)
          );

      svg.select('.x-axis').call(xAxis);
      svg.select('.y-axis').call(y1Axis);

      svg
        .select('.plot-area')
        .attr('fill', 'steelblue')
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.slice))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y1(0) - margin.bottom)
        .attr('height', (d) => height - y1(0));

      // Animation
      svg
        .selectAll('rect')
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return y1(d.metric) - margin.bottom;
        })
        .attr('height', function (d) {
          return height - y1(d.metric);
        })
        .delay(function (d, i) {
          console.log(i);
          return i * 100;
        });
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 700,
        width: '60%',
        margin: 'auto',
        display: 'block',
      }}
    >
      <g className='plot-area' />
      <g className='x-axis' />
      <g className='y-axis' />
    </svg>
  );
}

export default SliceBarChart;
