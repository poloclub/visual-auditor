import { useD3 } from '../../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function SliceBarChart({ data, model, max }) {
  function useForceUpdate() {
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const ref = useD3(
    (svg) => {
      const height = 600;
      const width = 875;
      const margin = { top: 20, right: 30, bottom: 50, left: 40 };

      let div = d3
        .select('.tooltip')
        .style('opacity', 0)
        .style('width', '200px')
        .style('height', '150px')
        .style('padding', '1rem 0.5rem 0 0.5rem')
        .style('border-radius', '20px');

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.slice))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, max])
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
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .style('fill', (d) => {
          return d3.interpolateBlues(d.metric);
        })
        .on('mouseover', function (d, i) {
          d3.select(this).style('opacity', '0.7');
          div
            .transition()
            .duration(200)
            .style('opacity', 0.9)
            .style('left', width + 'px')
            .style('top', height / 4 + 'px');
          div.html(
            '<strong>Slice Description: </strong>' +
              '<br><div style={{margin: "1rem"}}> </div>' +
              i.slice +
              '<br>' +
              '<strong>Size: </strong>' +
              '<br>' +
              i.size +
              ' samples' +
              '<br>' +
              '<strong>Metric: </strong>' +
              '<br>' +
              i.metric.toFixed(2)
          );
        })
        .on('mouseout', function (d) {
          d3.select(this).style('opacity', '1');
          div
            .transition()
            .style('opacity', 0)
            .style('left', width + 'px')
            .style('top', height + 'px');
        })
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
          return i * 100;
        });

      svg
        .append('svg:line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y1(model))
        .attr('y2', y1(model))
        .style('stroke', 'rgb(26, 214, 249)');

      svg
        .append('svg:line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y1(model))
        .attr('y2', y1(model))
        .style('stroke', 'rgb(26, 214, 249)');
      d3.select('#force-g').remove();
    },
    [data]
  );

  return (
    <div>
      <div
        className='tooltip'
        style={{ position: 'absolute', background: 'lightgray' }}
      ></div>
      <svg
        ref={ref}
        style={{
          height: 700,
          width: '60%',
          margin: 'auto',
          display: 'block',
        }}
        onMouseEnter={forceUpdate}
        onMouseLeave={forceUpdate}
      >
        <g className='plot-area' />
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
    </div>
  );
}

export default SliceBarChart;
