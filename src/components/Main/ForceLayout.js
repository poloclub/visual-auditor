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
  function useForceUpdate() {
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const width = 800;
  const height = 800;
  const ref = useD3(
    (svg) => {
      let div = d3
        .select('.tooltip')
        .style('opacity', 0)
        .style('width', '200px')
        .style('height', '150px')
        .style('padding', '1rem 0.5rem 0 0.5rem')
        .style('border-radius', '20px');
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
      const xCenter = [];
      const yCenter = [];
      for (let i = 0; i < features.length; i++) {
        xCenter.push(((width - 200) / features.length) * i + 100);
        yCenter.push(((height - 200) / features.length) * i - 100);
      }
      const nodes = data.map((obj) => {
        return {
          radius: Math.sqrt(obj.size),
          category: obj.degree,
          xFeature: obj.classifiers[0],
          yFeature: obj.classifiers[1] ?? obj.classifiers[0],
          slice: obj.slice,
          size: obj.size,
          metric: obj.metric,
        };
      });

      const simulation = d3
        .forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(5))
        .force(
          'x',
          d3.forceX().x(function (d) {
            return xCenter[features.indexOf(d.xFeature)];
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
        d3.select('svg g')
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
              .style('opacity', '0.7');
            div
              .transition()
              .duration(200)
              .style('opacity', 0.9)
              .style('left', width / 3 + d.x + 'px')
              .style('top', height / 6 + d.y + 'px');
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
      <svg
        width={width}
        height={height}
        onMouseEnter={forceUpdate}
        onMouseLeave={forceUpdate}
        id='force-svg'
        className='svg'
      >
        <g id='force-g' className='g' transform='translate(50, 200)'></g>
      </svg>
    </div>
  );
}

export default ForceLayout;
