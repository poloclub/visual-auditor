import { useD3 } from '../../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import './StickyForceLayout.css';
import Button from '@mui/material/Button';

function StickyForceLayout({ data, sizeMax, degree, view, metric }) {
  const [value, setValue] = React.useState(0); // integer state
  function useForceUpdate() {
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const width = 800;
  const height = 600;

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
      radius: Math.max((obj.size / sizeMax) * 80, 20),
      category: obj.degree,
      xFeature: obj.classifiers[0],
      yFeature: obj.classifiers[1] ?? obj.classifiers[0],
      slice: obj.slice,
      size: obj.size,
      metric: obj.metric,
      classifiers: obj.classifiers,
    };
  });

  function findCommonElements(arr1, arr2) {
    return arr1.sort().join(',') === arr2.sort().join(',');
  }

  const links = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (findCommonElements(nodes[i].classifiers, nodes[j].classifiers)) {
        links.push({ source: i, target: j });
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
      svg = d3
        .select('.svg')
        .attr('viewBox', '0,0,100vh,100vh')
        .style('width', '60%')
        .style('height', '60%');
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
          return d3.interpolateBlues(d.metric);
        })
        .classed('node', true)
        .classed('fixed', (d) => d.fx !== undefined)
        .on('mouseover', function (d, i) {
          d3.select(this)
            .attr('r', i.radius * 1.1)
            .style('opacity', '0.7');
          d3.select('.tooltip')
            .transition()
            .duration(200)
            .style('opacity', 0.9)
            .style('left', width / 3 + i.x + 'px')
            .style('top', height / 2.5 + i.y + 'px');
          d3.select('.tooltip').html(
            '<strong>Slice Description: </strong>' +
              '<br><div style={{margin: "1rem"}}> </div>' +
              i.slice +
              '<br>' +
              '<strong>Size: </strong>' +
              '<br>' +
              i.size +
              ' samples' +
              '<br>' +
              '<strong>' +
              metric +
              ': ' +
              '</strong>' +
              '<br>' +
              i.metric.toFixed(2)
          );
        })
        .on('mouseout', function (d, i) {
          d3.select(this).attr('r', i.radius).style('opacity', '1');
          d3.select('.tooltip')
            .transition()
            .style('opacity', 0)
            .style('left', width + 'px')
            .style('top', height + 'px');
        });

      const simulation = d3
        .forceSimulation()
        .nodes(graph.nodes)
        .force('charge', d3.forceManyBody().strength(-5))
        .force('center', d3.forceCenter(width / 2, height / 2).strength(1))
        .force('link', d3.forceLink(graph.links))
        .force(
          'collision',
          d3.forceCollide().radius(function (d) {
            return d.radius;
          })
        )
        .on('tick', tick);

      const drag = d3.drag().on('start', dragstart).on('drag', dragged);

      node.call(drag).on('click', click);

      function tick() {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      }

      function click(event, d) {
        delete d.fx;
        delete d.fy;
        d3.select(this).classed('fixed', false);
        d3.select(this).style('fill', d3.interpolateBlues(d.metric));
        simulation.alpha(1).restart();
      }

      function dragstart() {
        d3.select(this).classed('fixed', true);
        d3.select(this).style('fill', 'lightgray');
      }

      function dragged(event, d) {
        d.fx = clamp(event.x, 0, width);
        d.fy = clamp(event.y, 0, height);
        simulation.alpha(1).restart();
      }

      d3.select('svg g').remove();
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

export default StickyForceLayout;
