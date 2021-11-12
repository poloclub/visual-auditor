import { useD3 } from '../../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import './GraphLayout.css';
import Button from '@mui/material/Button';
import logLossSamples from '../../data/loglosssamples.json';
import reverseLogLossSamples from '../../data/reverseloglosssamples.json';
import accuracySamples from '../../data/accuracysamples.json';
import precisionSamples from '../../data/precisionsamples.json';

function GraphLayout({
  data,
  degree,
  metric,
  model,
  overperforming,
  radiusType,
  edgeFiltering,
  edgeThickness,
  edgeForce,
  setDetails,
  pointerMode,
}) {
  const margin = { top: 20, right: 30, bottom: 50, left: 80 };
  const [selected, setSelected] = React.useState(null);
  const [value, setValue] = React.useState(0); // integer state
  function useForceUpdate() {
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const width = 800;
  const height = 700;

  const features = [];

  let samples;

  switch (metric) {
    case 'Log Loss':
      if (overperforming) samples = reverseLogLossSamples;
      else samples = logLossSamples;
      break;
    case 'Accuracy':
      if (overperforming) samples = accuracySamples;
      else samples = accuracySamples;
      break;
    case 'Precision':
      if (overperforming) samples = precisionSamples;
      else samples = precisionSamples;
      break;
    default:
      if (overperforming) samples = reverseLogLossSamples;
      else samples = logLossSamples;
      break;
  }

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
    yCenter.push(((height - 200) / features.length) * i + 100);
  }

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
      .attr('transform', `translate(${margin.left},${0 - 2 * margin.bottom})`)
      .call(d3.axisLeft(x).tickSizeOuter(0))
      .selectAll('text')
      .style('text-anchor', 'end');

  const nodes = data.map((obj) => {
    return {
      radius: radiusType === 'log' ? Math.log(obj.size) : Math.sqrt(obj.size),
      category: obj.degree,
      xFeature: obj.classifiers[0],
      yFeature: obj.classifiers[1] ?? obj.classifiers[0],
      slice: obj.slice,
      size: obj.size,
      metric: obj.metric,
      classifiers: obj.classifiers,
    };
  });

  function countCommonSamples(slice1, slice2) {
    let arr1 = samples[slice1];
    let arr2 = samples[slice2];
    if (!arr1 || !arr2) return 0;
    arr1 = arr1.sort().slice(0, 1000);
    arr2 = arr2.sort().slice(0, 1000);
    return arr1.filter((sample) => arr2.includes(sample)).length;
  }

  const links = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const count = countCommonSamples(nodes[i].slice, nodes[j].slice);
      if (count > edgeFiltering) {
        links.push({
          source: i,
          target: j,
          sliceSource: nodes[i].slice,
          sliceTarget: nodes[j].slice,
          count: count,
        });
      }
    }
  }

  const graph = {
    nodes: nodes,
    links: links,
  };

  function clamp(x, lo, hi) {
    return x < lo ? lo : x > hi ? hi : x;
  }

  const ref = useD3(
    (svg) => {
      // svg.select('.y-axis').call(y1Axis);

      svg = d3.select('.svg').style('width', '60%').style('height', '60%');
      const link = svg
        .selectAll('.link')
        .data(graph.links)
        .join('line')
        .classed('link', true);
      const node = svg
        .selectAll('.node')
        .data(graph.nodes)
        .join('circle')
        .attr('r', function (d) {
          return d.radius;
        })
        .style('fill', function (d) {
          if (d.slice === selected) {
            return d3.interpolateGreys(0.5);
          }
          if (overperforming)
            return d3.interpolateBlues(Math.abs((d.metric - model) / model));
          return d3.interpolateReds(Math.abs((d.metric - model) / model));
        })
        .classed('node', true)
        .classed('fixed', (d) => d.fx !== undefined)
        .on('mouseover', function (event, d) {
          d3.select(this).attr('r', d.radius).style('opacity', '0.7');
          d3.select('.tooltip')
            .transition()
            .duration(200)
            .style('opacity', 0.9)
            .style('left', Math.min(Math.max(0, d.x), width - 200) + 100 + 'px')
            .style('top', Math.min(height - 200, Math.max(0, d.y)) + 'px');
          d3.select('.tooltip').html(
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
              `(${Math.round(((d.metric - model) / model) * 100)}% difference)`
          );
        })
        .on('mouseout', function (d, i) {
          d3.select(this).attr('r', i.radius).style('opacity', '1');
          d3.select('.tooltip')
            .transition()
            .style('opacity', 0)
            .style('left', width + 'px')
            .style('top', 0 + 'px');
        })
        .on('click', click);

      const simulation = d3
        .forceSimulation()
        .nodes(graph.nodes)
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2).strength(0.1))
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
          'link',
          d3.forceLink(graph.links).strength((d) => {
            return (d.count / 10000) * edgeForce;
          })
        )
        .force(
          'collision',
          d3.forceCollide().radius(function (d) {
            return d.radius;
          })
        )
        .on('tick', tick);
      if (pointerMode === 'drag') {
        const drag = d3.drag().on('start', dragstart).on('drag', dragged);

        node.call(drag).on('click', click);
      }

      function tick() {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)
          .style(
            'stroke-width',
            (d) => Math.pow(d.count / 1000, 2) * edgeThickness
          );
        node
          .attr('cx', (d) => Math.max(Math.min(d.x, width), d.radius + 100))
          .attr('cy', (d) => Math.max(Math.min(d.y, height - 75), d.radius));
      }
      function click(event, d) {
        if (pointerMode === 'select') {
          setSelected(d.slice);
          setDetails({
            slice: d.slice,
            size: d.size,
            metric: d.metric,
            similarSlices: links
              .map((link) => {
                if (
                  link.count > edgeFiltering &&
                  link.sliceSource === d.slice
                ) {
                  return link.sliceTarget;
                } else if (
                  link.count > edgeFiltering &&
                  link.sliceTarget === d.slice
                ) {
                  return link.sliceSource;
                }
                return undefined;
              })
              .filter((link) => link !== undefined),
          });
        } else {
          delete d.fx;
          delete d.fy;
          d3.select(this).classed('fixed', false);
          d3.select(this).style('fill', () => {
            if (overperforming)
              return d3.interpolateBlues(Math.abs((d.metric - model) / model));
            return d3.interpolateReds(Math.abs((d.metric - model) / model));
          });
          simulation.alpha(1).restart();
        }
      }

      function dragstart(event, d) {
        d3.select(this).classed('fixed', true);
        d3.select(this).style('fill', 'lightgray');
      }

      function dragged(event, d) {
        d.fx = clamp(event.x, 0, width);
        d.fy = clamp(event.y, 0, height);
        simulation.alpha(1).restart();
      }

      d3.select('svg g').remove();
      svg.select('.x-axis').call(xAxis);
      svg.select('.y-axis').call(yAxis);
    },
    [data, value]
  );

  return (
    <div className='container' style={{ overflow: 'scroll' }}>
      <div
        className='tooltip'
        style={{
          position: 'absolute',
          background: '#e6e6e6',
          borderRadius: '0.5rem',
          padding: '0.5rem',
        }}
      ></div>
      <svg className='svg' width={width} height={height}>
        <g transform='translate(50, 200)'></g>
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
      <br />
      <Button
        variant='outlined'
        onClick={forceUpdate}
        style={{ margin: '1rem' }}
      >
        Recenter
      </Button>
    </div>
  );
}

export default GraphLayout;
