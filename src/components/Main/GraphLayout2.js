import { useD3 } from '../../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import './GraphLayout.css';
import Button from '@mui/material/Button';
import samples from '../../data/samples.json';

function GraphLayout2({ data, degree, metric, model }) {
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
    yCenter.push(((height - 200) / features.length) * i + 100);
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
      classifiers: obj.classifiers,
    };
  });

  function findCommonElements(arr1, arr2) {
    return arr1.sort().join(',') === arr2.sort().join(',');
  }

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
      // if (findCommonElements(nodes[i].classifiers, nodes[j].classifiers)) {
      //   links.push({ source: i, target: j });
      // }
      if (countCommonSamples(nodes[i].slice, nodes[j].slice) > 500) {
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
          return d3.interpolateRdBu(Math.abs((d.metric - model) / model));
        })
        .classed('node', true)
        .classed('fixed', (d) => d.fx !== undefined)
        .on('mouseover', function (event, d) {
          d3.select(this).attr('r', d.radius).style('opacity', '0.7');
          d3.select('.tooltip')
            .transition()
            .duration(200)
            .style('opacity', 0.9)
            .style('left', width / 3 + d.x + 'px')
            .style('top', height / 2.5 + d.y + 'px');
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
            .style('top', height + 'px');
        });

      const simulation = d3
        .forceSimulation()
        .nodes(graph.nodes)
        .force('charge', d3.forceManyBody().strength(-10))
        // .force('center', d3.forceCenter(width / 2, height / 2).strength(0.01))
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
        d3.select(this).style(
          'fill',
          d3.interpolateRdBu(Math.abs((d.metric - model) / model))
        );
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

export default GraphLayout2;
