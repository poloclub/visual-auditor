import { useD3 } from '../../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function ForceLayout({
  data,
  degree,
  view,
  metric,
  model,
  overperforming,
  setDetails,
}) {
  const [selected, setSelected] = React.useState(null);
  const margin = { top: 20, right: 30, bottom: 70, left: 85 };
  const width = 800;
  const height = 800;

  const features = [];
  data.forEach((obj) => {
    obj.classifiers = [];
    let str = obj.slice;
    while (str.indexOf(':') !== -1) {
      let temp = str.substring(0, str.indexOf(':'));
      obj.classifiers.push(temp);
      if (!features.includes(temp)) features.push(temp);
      if (str.indexOf(',') !== -1) {
        str = str.substring(str.indexOf(',') + 2);
      } else {
        str = '';
      }
    }
  });

  console.log(features);

  const x = d3
    .scaleBand()
    .domain(features)
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1);

  const xAxis = (g) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},${30 - margin.bottom})`)
      .call(d3.axisLeft(x).tickSizeOuter(0))
      .selectAll('text')
      .style('text-anchor', 'end');

  const xAxisGrid = (g) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSizeOuter(0)
          .tickSizeInner(-height - margin.top + 2 * margin.bottom)
      )
      .style('opacity', 0.1)
      .selectAll('text')
      .style('display', 'none');
  const yAxisGrid = (g) =>
    g
      .attr('transform', `translate(${margin.left},${30 - margin.bottom})`)
      .call(
        d3
          .axisLeft(x)
          .tickSizeOuter(0)
          .tickSizeInner(-width - margin.right + 2 * margin.left)
      )
      .style('opacity', 0.1)
      .selectAll('text')
      .style('display', 'none');

  const ref = useD3(
    (svg) => {
      let div = d3
        .select('.tooltip')
        .style('opacity', 0)
        .style('width', '200px')
        .style('height', '150px')
        .style('padding', '1rem 0.5rem 0 0.5rem')
        .style('border-radius', '20px');
      const xCenter = [];
      const yCenter = [];
      for (let i = 0; i < features.length; i++) {
        xCenter.push(((width - 150) / features.length) * i + 100);
        yCenter.push(((height - 175) / features.length) * i - 100);
      }
      const nodes = data.map((obj) => {
        return {
          radius: Math.log(obj.size),
          category: obj.degree,
          xFeature: obj.classifiers[0],
          yFeature: obj.classifiers[1] ?? obj.classifiers[0],
          slice: obj.slice,
          size: obj.size,
          metric: obj.metric,
        };
      });

      console.log(nodes);

      const simulation = d3
        .forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-5))
        .force(
          'x',
          d3.forceX().x(function (d) {
            return xCenter[features.indexOf(d.xFeature)] - 20;
          })
        )
        .force(
          'y',
          d3.forceY().y(function (d) {
            if (degree > 1) {
              return yCenter[features.indexOf(d.yFeature)];
            } else {
              return height / 4;
            }
          })
        )
        .force(
          'collision',
          d3.forceCollide().radius(function (d) {
            return d.radius;
          })
        )
        .on('tick', ticked);

      function ticked() {
        d3.select('.g')
          .selectAll('circle')
          .data(nodes)
          .join('circle')
          .attr('class', 'node')
          .attr('r', function (d) {
            return d.radius;
          })
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) {
            return d.y;
          })
          .style('fill', function (d) {
            if (d.slice === selected) {
              return d3.interpolateGreys(0.5);
            }
            if (overperforming)
              return d3.interpolateBlues(Math.abs((d.metric - model) / model));
            return d3.interpolateReds(Math.abs((d.metric - model) / model));
          })
          .style('opacity', function (d) {
            return '1';
          })
          .on('mouseover', function (event, d) {
            d3.select(this)
              .attr('r', d.radius * 1.1)
              .style('opacity', '0.7')
              .style('cursor', 'pointer');
            div
              .transition()
              .duration(200)
              .style('opacity', 0.9)
              .style(
                'left',
                (d.x < 0.75 * width ? width / 2 + d.x : d.x + width / 4) + 'px'
              )
              .style('top', height / 5 + d.y + 'px');
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
                '<strong>' +
                metric +
                ': ' +
                '</strong>' +
                '<br>' +
                d.metric.toFixed(2) +
                '<br>' +
                `(${Math.round(
                  ((d.metric - model) / model) * 100
                )}% difference)`
            );
          })
          .on('mouseout', function (event, d) {
            d3.select(this).attr('r', d.radius).style('opacity', '1');
            div
              .transition()
              .style('opacity', 0)
              .style('left', width + 'px')
              .style('top', 0 + 'px');
          })
          .on('click', function (event, d) {
            setSelected(d.slice);
            setDetails({
              slice: d.slice,
              size: d.size,
              metric: d.metric,
              similarSlices: [],
            });
          });
      }

      d3.select('.x-axis-grid').call(xAxisGrid);
      d3.select('.y-axis-grid').call(yAxisGrid);
      d3.select('.x-axis').call(xAxis);
      if (degree >= 2) {
        d3.select('.y-axis').call(yAxis).style('opacity', '1');
      } else {
        d3.select('.y-axis').style('opacity', '0');
      }
    },
    [data, view]
  );

  if (view !== 'force') return null;

  return (
    <div className='force'>
      <div
        className='tooltip'
        style={{ position: 'absolute', background: '#e6e6e6' }}
      ></div>
      <svg width={width} height={height} id='force-svg' className='svg'>
        <g id='force-g' className='g' transform='translate(50, 200)'></g>
        <g className='x-axis' />
        <g className='y-axis' />
        <g className='x-axis-grid' />
        <g className='y-axis-grid' />
      </svg>
    </div>
  );
}

export default ForceLayout;
