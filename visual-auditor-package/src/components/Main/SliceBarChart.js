import { useD3 } from '../../hooks/useD3';
import React, { memo } from 'react';
import * as d3 from 'd3';

function SliceBarChart({
  data,
  model,
  max,
  overperforming,
  metric,
  setDetails,
}) {
  const [selected, setSelected] = React.useState(null);
  const [doneAnimating, setDoneAnimating] = React.useState(false);
  React.useEffect(() => {
    setDoneAnimating(false);
  }, [data]);

  const ref = useD3(
    (svg) => {
      const height = 600;
      const width = 875;
      const margin = { top: 60, right: 30, bottom: 50, left: 90 };

      let div = d3
        .select('.tooltip')
        .style('opacity', 0)
        .style('width', '200px')
        .style('height', '150px')
        .style('padding', '1rem 1rem 0rem 1rem')
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
          .style("font", "14px")
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
        .attr("style", (d) => {
          if (d.slice === selected) {
            return "outline: 3px solid #FFD600;"
          }
        })
        .style('fill', (d) => {
          // if (d.slice === selected) {
          //   return d3.interpolateGreys(0.5);
          // }
          if (overperforming)
            return d3.interpolateBlues(Math.abs((d.metric - model) / model));
          return d3.interpolateReds(Math.abs((d.metric - model) / model));
        })
        .on('mouseover', function (event, d) {
          d3.select(this).style('opacity', '0.7').style('cursor', 'pointer');
          div
            .transition()
            .duration(200)
            .style('opacity', 0.9)
            .style('right', '20%')
            .style('top', '100px');
          div.html(
            '<strong>Slice Description: </strong>' +
              '<br><div style={{margin: "1rem"}}> </div>' +
              d.slice +
              '<br>' +
              '<strong>Size: </strong>' +
              '<br>' +
              d.size +
              ' samples' +
              '<br>' +
              '<strong>Metric: </strong>' +
              '<br>' +
              d.metric.toFixed(2) +
              ' ' +
              `(${Math.round(((d.metric - model) / model) * 100)}% difference)`
          );
        })
        .on('mouseout', function (d) {
          d3.select(this).style('opacity', '1');
          div
            .transition()
            .style('opacity', 0)
        })
        .on('click', function (event, d) {
          setSelected(d.slice);
          setDetails({
            slice: d.slice,
            size: d.size,
            metric: d.metric,
            similarSlices: [],
          });
        })
        .attr('x', (d) => x(d.slice))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y1(0) - margin.bottom)
        .attr('height', (d) => height - y1(0));

      // Animation
      if (!doneAnimating) {
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
        setDoneAnimating(true);
      } else {
        svg
          .selectAll('rect')
          .attr('y', function (d) {
            return y1(d.metric) - margin.bottom;
          })
          .attr('height', function (d) {
            return height - y1(d.metric);
          });
      }

      svg.selectAll('.line').remove();
      svg.selectAll('.label').remove();

      svg
        .append('svg:line')
        .attr('class', 'line')
        .attr('x1', 60)
        .attr('x2', width)
        .attr('y1', y1(model))
        .attr('y2', y1(model))
        .style('stroke', '#e6e6e6');
      svg
        .append('text')
        .attr('class', 'label')
        .text('Model')
        .attr('x', 0)
        .attr('y', y1(model) + 5)
        .style('fill', 'gray');
      svg
        .append('text')
        .attr('class', 'label')
        .text(metric)
        .attr('x', 0)
        .attr('y', y1(model) + 25)
        .style('fill', 'gray');
    },
    [data, metric, selected]
  );

  return (
    <div style={{width: '100%'}}>
      <div
        className='tooltip'
        style={{ position: 'absolute', background: 'lightgray', right: '20%', top: '100px' }}
      ></div>
      <svg
        ref={ref}
        viewBox="0 0 875 875" width="80%" height="80%"
        style={{
          margin: 'auto',
          display: 'block',
        }}
      >
        <g className='plot-area' />
        <g className='x-axis' />
        <g className='y-axis' />
        <g className='label' />
      </svg>
    </div>
  );
}

export default memo(SliceBarChart);