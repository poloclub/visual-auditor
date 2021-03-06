import { useD3 } from '../../hooks/useD3';
import React, { memo } from 'react';
import * as d3 from 'd3';
import './ForceLayout.css';

function ForceLayout({
  data,
  degree,
  view,
  metric,
  model,
  overperforming,
  setDetails,
  radius,
  setShowConvexHull,
  nodeSize,
  nodeColor,
}) {
  const margin = { top: 50, right: 30, bottom: 70, left: 85 };
  const width = 800;
  const height = 800;
  const hulls = Array.from(Array(100).keys());

  let features = [];
  const groupings = {};

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

  const ref = useD3(
    (svg) => {
      let convexHullShowing = false;
      d3.select('.hull').remove();
      let div = d3
        .select('.tooltip')
        .style('opacity', 0)
        .style('width', '250px')
        .style('height', '200px')
        .style('padding', '1rem 1rem 0 1rem')
        .style('border-radius', '20px');
      const xCenter = [];
      const yCenter = [];
      for (let i = 0; i < features.length; i++) {
        xCenter.push(((width - 150) / features.length) * i + 100);
        yCenter.push(((height - 175) / features.length) * i - 100);
      }
      const nodes = data.map((obj) => {
        return {
          radius: nodeSize === 'size' ? Math.log(obj.size) * 2 : Math.sqrt(obj.accuracy) * 10,
          category: obj.degree,
          xFeature: obj.classifiers[0],
          yFeature: obj.classifiers[1] ?? obj.classifiers[0],
          slice: obj.slice,
          size: obj.size,
          metric: obj.metric,
          accuracy: obj.accuracy,
        };
      });

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

      let bubbles = d3
        .select('.g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('class', 'node')
        .attr('r', function (d) {
          return d.radius;
        })
        .style('fill', function (d) {
          if (overperforming)
            return d3.interpolateBlues(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : d.accuracy)));
          return d3.interpolateReds(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : 1 - d.accuracy)));
        })
        .style('opacity', function (d) {
          return '1';
        });
      function ticked() {
        bubbles
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) {
            return d.y;
          })
          .on('mouseover', function (event, d) {
            d3.select(this)
              .attr('r', d.radius * 1.1)
              .style('opacity', '0.7')
              .style('cursor', 'pointer');
            div
              .transition()
              .duration(0)
              .style('display', 'block')
              .style('opacity', 0.9)
              .style('left', (event.clientX + 50) + 'px')
              .style('top', (event.clientY) + 'px')
            div.html(
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
              d.accuracy?.toFixed(2)
            );
          })
          .on('mouseout', function (event, d) {
            d3.select(this).attr('r', d.radius).style('opacity', '1');
            div
              .transition()
              .duration(50)
              .style('opacity', 0)
              .style('display', 'none')
          })
          .on('click', function (event, d) {
            bubbles.style('fill', function (d) {
              if (event.target.__data__ === d) {
                return "#FFD600"
              }
              if (overperforming)
                return d3.interpolateBlues(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : d.accuracy)))
              return d3.interpolateReds(Math.abs((nodeColor === 'loss' ? (d.metric - model) / model : 1 - d.accuracy)))
            });
            setDetails({
              slice: d.slice,
              size: d.size,
              metric: d.metric,
              similarSlices: [],
            });
          });
      }

      const convexHull = (g, opacity) => {
        const colors = ['gray', 'green', 'yellow', 'black', 'purple'];
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
                vertices.push([nodes[j].x + 50, height / 2]);
              } else {
                vertices.push([nodes[j].x + 50, nodes[j].y + 200]);
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

      d3.select('.x-axis-grid').call(xAxisGrid);
      d3.select('.y-axis-grid').call(yAxisGrid);
      d3.select('.x-axis').call(xAxis);
      if (degree >= 2) {
        d3.select('.y-axis').call(yAxis).style('opacity', '1');
      } else {
        d3.select('.y-axis').style('opacity', '0');
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
          d3.select(`.hull`).remove();
          d3.selectAll(`.hull`).transition().duration(0).style('opacity', '0');
        }
      });
    },
    [data, view]
  );

  if (view !== 'force') return null;

  return (
    <div className='force'>
      <div
        className='tooltip'
        style={{ position: 'absolute', background: '#e6e6e6', right: '20%', top: '100px', }}
      ></div>
      <svg viewBox="0 0 875 875" width="80%" height="100%" id='force-svg' className='svg' style={{ margin: '0 auto', display: 'block', height: '1000px' }}>
        <g transform="translate(50, 0)">
          <g id='force-g' className='g' transform='translate(50, 200)'></g>
          <g className='x-axis' style={{ padding: '100px' }}/>
          <g className='y-axis' />
          <g className='x-axis-grid' />
          <g className='y-axis-grid' />
          {hulls.map((hull) => (
            <g className={'hull'} key={hull} />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default memo(ForceLayout);