import { useD3 } from '../../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function BarPlot() {
  const ref = useD3((svg) => {
    // set the dimensions and margins of the graph
    const height = 500;
    const width = 500;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Parse the Data
    const dataCSV = d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv'
    );

    dataCSV.then(function (data) {
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Country;
          })
        )
        .padding(0.1);

      // Y axis
      const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);

      const xAxis = (g) =>
        g.attr('transform', `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      svg.select('.x-axis').call(xAxis);
      svg.select('.y-axis').call(d3.axisLeft(y));

      // Bars
      svg
        .select('.plot-area')
        .attr('fill', 'steelblue')
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', function (d) {
          return x(d.Country);
        })
        .attr('y', function (d) {
          return y(d.Value);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - y(d.Value);
        });
    });
  }, []);

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: '50%',
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

export default BarPlot;
