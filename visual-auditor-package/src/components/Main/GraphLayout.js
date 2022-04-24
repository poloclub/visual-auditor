import { useD3 } from '../../hooks/useD3';
import React, { memo } from 'react';
import * as d3 from 'd3';
import './GraphLayout.css';
import logLossSamples from '../../data/loglosssamples.json';
import reverseLogLossSamples from '../../data/reverseloglosssamples.json';
import commonSamples from '../../data/commonSamples.json';
import reverseCommonSamples from '../../data/reverseCommonSamples.json';

function GraphLayout({
  data,
  degree,
  metric,
  model,
  average,
  overperforming,
  radiusType,
  edgeFiltering,
  edgeForce,
  setDetails,
  cursorMode,
  algorithm,
  setShowConvexHull,
  nodeSize,
  nodeColor
}) {
  const margin = { top: 50, right: 30, bottom: 70, left: 85 };
  const [value, setValue] = React.useState(0);
  const hulls = Array.from(Array(100).keys());
  function useForceUpdate() {
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const width = 800;
  const height = 800;

  let features = [];
  const groupings = {};

  let samples;
  let matches = {};

  switch (metric) {
    case 'Log Loss':
      if (overperforming) {
        samples = reverseLogLossSamples;
        matches = reverseCommonSamples;
      } else {
        matches = commonSamples;
        samples = logLossSamples;
      }
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
      if (degree === obj.classifiers.length) {
        if (groupings[obj.classifiers.join(', ')])
          groupings[obj.classifiers.join(', ')]++;
        else groupings[obj.classifiers.join(', ')] = 1;
      }
      if (str.indexOf(',') !== -1) {
        str = str.substring(str.indexOf(',') + 2);
      } else {
        str = '';
      }
    }
  });

  features = features.sort();

  const groupingsArray = Object.keys(groupings)
    .map((key) => [key, groupings[key]])
    .sort((a, b) => b[1] - a[1]);

  const topGroupings = groupingsArray.slice(0, 15);

  const xCenter = [];
  const yCenter = [];

  const xTickDistance =
    (width - margin.left - margin.right) / (features.length + 1);
  const yTickDistance =
    (height - margin.top - margin.bottom) / (features.length + 2);

  for (let i = 0; i < features.length; i++) {
    xCenter.push(margin.left + (i + 1) * xTickDistance);
    yCenter.push(2 * margin.top + (i + 1) * yTickDistance);
  }

  const x = d3
    .scaleBand()
    .domain(features)
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1);

  const xAxis = (g) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom - 670})`)
      .attr('class', 'xAxis')
      .call(d3.axisTop(x).tickSizeOuter(0))
      .selectAll('text')
      .style("font-size", "14px")
      .attr('transform', 'translate(10,-10)rotate(-45)')
      .style('text-anchor', 'start');

  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},${30 - margin.bottom})`)
      .attr('class', 'xAxis')
      .call(d3.axisLeft(x).tickSizeOuter(0))
      .selectAll('text')
      .style("font-size", "14px")
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

  const nodes = data.map((obj) => {
    return {
      radius: nodeSize === 'size' ? Math.log(obj.size) * 2 : Math.sqrt(obj.accuracy) * 10,
      category: obj.degree,
      xFeature: obj.classifiers[0],
      yFeature: obj.classifiers[1] ?? obj.classifiers[0],
      slice: obj.slice,
      size: obj.size,
      metric: obj.metric,
      classifiers: obj.classifiers,
      accuracy: obj.accuracy,
    };
  });

  function countCommonSamples(slice1, slice2) {
    let arr1 = samples[slice1];
    let arr2 = samples[slice2];
    if (!arr1 || !arr2) return 0;
    arr1 = arr1.sort((a, b) => 0.5 - Math.random()).slice(0, 2000);
    return arr1.filter((sample) => arr2.includes(sample)).length;
  }

  let links = [];
  let common = {};

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const count = matches[nodes[i].slice + '-' + nodes[j].slice];
      // const count = countCommonSamples(nodes[i].slice, nodes[j].slice);
      // common[nodes[i].slice + '-' + nodes[j].slice] = count;
      // common[nodes[j].slice + '-' + nodes[i].slice] = count;
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

  // console.log(JSON.stringify(common));

  // const links = [];
  // console.log(JSON.stringify(links));

  const graph = {
    nodes: nodes,
    links: links,
  };

  function clamp(x, lo, hi) {
    return x < lo ? lo : x > hi ? hi : x;
  }

  const ref = useD3(
    (svg) => {
      let convexHullShowing = false;
      d3.select('.hull').remove();
      svg = d3.select('.svg')
      let link = svg
        .selectAll('.link')
        .attr('class', 'link')
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
          if (overperforming)
            return d3.interpolateBlues(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : d.accuracy)));
          return d3.interpolateReds(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : 1 - d.accuracy)));
        })
        .classed('node', true)
        .classed('fixed', (d) => d.fx !== undefined)
        .on('mouseover', function (event, d) {
          cursorMode === 'select'
            ? d3
                .select(this)
                .attr('r', d.radius)
                .style('opacity', '0.7')
                .style('cursor', 'pointer')
            : d3
                .select(this)
                .attr('r', d.radius)
                .style('opacity', '0.7')
                .style('cursor', 'grab');
          d3.select('.tooltip')
            .transition()
            .duration(200)
            .attr('max-width', '100px')
            .style('display', 'block')
            .style('opacity', 0.9)
            .style('left', (event.clientX + 100) + 'px')
            .style('top', (event.clientY) + 'px')
            .style('padding', '1rem 1rem 1rem 1rem')
          d3.select('.tooltip').html(
            '<strong>Description: </strong>' +
              d.slice +
              '<br><br>' +
              '<strong>Size: </strong>' +
              d.size +
              ' samples' +
              '<br><br>' +
              '<strong>Log Loss: </strong>' +
              d.metric.toFixed(2) +
              ' ' +
              `(${Math.round(((d.metric - model) / model) * 100)}% difference)` +
              '<br><br>' +
              '<strong>Accuracy: </strong>' +
              d.accuracy?.toFixed(2) +
              ' ' +
              `(${Math.round(((d.accuracy - average) / average) * 100)}% difference)`
          );
        })
        .on('mouseout', function (d, i) {
          d3.select(this).attr('r', i.radius).style('opacity', '1');
          d3.select('.tooltip')
            .transition()
            .style('opacity', 0)
            .style('display', 'none')
        })
        .on('click', click);

      const simulation = d3
        .forceSimulation()
        .nodes(graph.nodes)
        .force('charge', d3.forceManyBody().strength(-5))
        // .force('center', d3.forceCenter(width / 2, height / 2).strength(0.1))
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
              return height / 2;
            }
          })
        )
        .force(
          'link',
          d3.forceLink(graph.links).strength((d) => {
            return (d.count / 100000) * edgeForce;
          })
        )
        .force(
          'collision',
          d3.forceCollide().radius(function (d) {
            return d.radius;
          })
        )
        .on('tick', tick);
      if (cursorMode === 'drag') {
        const drag = d3.drag().on('start', dragstart).on('drag', dragged);

        node.call(drag).on('click', click);
      }

      function tick() {
        link
          .attr('x1', (d) =>
            Math.max(Math.min(d.source.x, width), d.source.radius + 100) + 50
          )
          .attr('y1', (d) =>
            Math.max(Math.min(d.source.y, height - 75), d.source.radius)
          )
          .attr('x2', (d) =>
            Math.max(Math.min(d.target.x, width), d.target.radius + 100) + 50
          )
          .attr('y2', (d) =>
            Math.max(Math.min(d.target.y, height - 75), d.target.radius)
          )
          .style('stroke-width', (d) =>
            Math.min(
              Math.pow(d.count / 2000, 2) * edgeForce,
              Math.pow(d.count / 2000, 2) * 3
            )
          );
        node
          .attr('cx', (d) => Math.max(Math.min(d.x, width), d.radius + 100) + 50)
          .attr('cy', (d) => Math.max(Math.min(d.y, height - 75), d.radius));
      }

      function click(event, d) {
        if (cursorMode === 'select') {
          node.style('fill', function (d) {
            if (event.target.__data__ === d) {
              return '#FFD600';
            }
            if (overperforming)
              return d3.interpolateBlues(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : d.accuracy)));
            return d3.interpolateReds(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : 1 - d.accuracy)));
          });
          setDetails({
            slice: d.slice,
            size: d.size,
            metric: d.metric,
            similarSlices: links
              .sort((a, b) => b.count - a.count)
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
              .filter((link) => link !== undefined)
              .slice(0, 10),
          });
        } else {
          delete d.fx;
          delete d.fy;
          d3.select(this).classed('fixed', false);
          d3.select(this).style('fill', () => {
            if (overperforming)
              return d3.interpolateBlues(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : d.accuracy)));
            return d3.interpolateReds(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : d.accuracy)));
          });
          simulation.alpha(1).restart();
        }
      }

      function dragstart(event, d) {
        d3.select(this).classed('fixed', true);
        d3.select(this).style('fill', '#FFD600');
        setDetails({
          slice: d.slice,
          size: d.size,
          metric: d.metric,
          similarSlices: links
            .sort((a, b) => b.count - a.count)
            .map((link) => {
              if (link.count > edgeFiltering && link.sliceSource === d.slice) {
                return link.sliceTarget;
              } else if (
                link.count > edgeFiltering &&
                link.sliceTarget === d.slice
              ) {
                return link.sliceSource;
              }
              return undefined;
            })
            .filter((link) => link !== undefined)
            .slice(0, 10),
        });
      }

      function dragged(event, d) {
        d.fx = clamp(event.x, 0, width);
        d.fy = clamp(event.y, 0, height);
        simulation.alpha(1).restart();
      }

      const convexHull = (g, opacity) => {
        const colors = [
          'gray',
          'green',
          'yellow',
          'black',
          'purple',
          'pink',
          'red',
          'orange',
          'brown',
          'blue',
          'cyan',
          'magenta',
          'lime',
          'navy',
          'olive',
          'teal',
          'violet',
          'wheat',
        ];
        let vertices = [];

        for (let i = 0; i < topGroupings.length; i++) {
          vertices = [];
          for (let j = 0; j < nodes.length; j++) {
            if (
              nodes[j].xFeature === topGroupings[i][0].split(', ')[0] &&
              (degree < 2 ||
                nodes[j].yFeature === topGroupings[i][0].split(', ')[1])
            ) {
              if (degree < 2) {
                vertices.push([nodes[j].x, height / 2]);
              } else {
                vertices.push([nodes[j].x, nodes[j].y]);
              }
            }
          }
          const hull = d3.polygonHull(vertices);
          const line = d3.line().curve(d3.curveLinearClosed);
          if (!hull) return;
          g.append('path')
            .attr('class', `path${degree}`)
            .attr('d', line(hull))
            .attr('fill', colors[0])
            .attr('stroke', colors[0])
            .attr('opacity', opacity);
        }
      };

      svg.select('.x-axis-grid').call(xAxisGrid);
      svg.select('.y-axis-grid').call(yAxisGrid);
      svg.select('.x-axis').call(xAxis);
      if (degree >= 2) {
        svg.select('.y-axis').call(yAxis).style('opacity', '1');
      } else {
        svg.select('.y-axis').style('opacity', '0');
      }
      d3.select('.switch').on('click', (event, d) => {
        setShowConvexHull(event.target.checked);
        convexHullShowing = event.target.checked;
        if (convexHullShowing)
          d3.select(`.hull`)
            .style('opacity', '0')
            .call(convexHull, 0.25)
            .transition()
            .duration(500)
            .style('opacity', '1');
        else {
          d3.select('.hull').remove();
          d3.selectAll('.hull').transition().duration(0).style('opacity', '0');
        }
      });
    },
    [data, value]
  );

  return (
    <div className='graph' style={{ overflow: 'scroll'}}>
      <div
        className='tooltip'
        style={{
          position: 'absolute',
          background: '#e6e6e6',
          borderRadius: '20px',
          padding: '1rem',
        }}
      ></div>
      <svg id='graph-svg' className='svg' viewBox="0 0 875 875" width="80%" height="80%" style={{ margin: '0 auto', display: 'block', height: '1000px' }}>
        <g transform="translate(50, 0)">
          <g id='graph-g' className='g' transform='translate(50, 200)'></g>
          <g className='x-axis' />
          <g className='y-axis' />
          <g className='x-axis-grid' />
          <g className='y-axis-grid' />
          {hulls.map((hull) => (
            <g className={'hull'} key={hull} />
          ))}
        </g>
      </svg>
      <br />
      {/* <Button
        variant='outlined'
        onClick={forceUpdate}
        style={{ margin: '1rem' }}
      >
        Recenter
      </Button> */}
    </div>
  );
}

export default memo(GraphLayout);