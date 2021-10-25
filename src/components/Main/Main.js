import React from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import logloss from '../../data/logloss.json';
import accuracy from '../../data/accuracy.json';
import precision from '../../data/precision.json';
import ForceLayout from './ForceLayout';
import StickyForceLayout from './StickyForceLayout';

const Main = ({ numFeatures, sampleSize, metric, view, sortBy }) => {
  let data;
  let modelMetric;
  switch (metric) {
    case 'Log Loss':
      data = Object.values(logloss['data']).map((obj) => Object.values(obj)[0]);
      modelMetric = logloss['model'];
      break;
    case 'Accuracy':
      data = Object.values(accuracy['data']).map(
        (obj) => Object.values(obj)[0]
      );
      modelMetric = accuracy['model'];
      break;
    case 'Precision':
      data = Object.values(precision['data']).map(
        (obj) => Object.values(obj)[0]
      );
      modelMetric = precision['model'];
      break;
    default:
      data = Object.values(logloss['data']).map((obj) => Object.values(obj)[0]);
      modelMetric = logloss['model'];
  }
  const metricArray = data.map((obj) => obj.metric);
  const sizeArray = data.map((obj) => obj.size);
  const max = Math.max(...metricArray);
  const sizeMax = Math.max(...sizeArray);
  let filteredData = data
    .filter((obj) => obj.size >= sampleSize)
    .filter((obj) => obj.degree <= numFeatures)
    .sort(function (a, b) {
      if (sortBy === 'size') return b.size - a.size;
      return b.metric - a.metric;
    });
  if (view === 'bar') {
    filteredData = filteredData.slice(0, 10);
  }
  return (
    <div className='main-container' style={{ display: 'block' }}>
      {view === 'bar' ? (
        <SliceBarChart data={filteredData} model={modelMetric} max={max} />
      ) : view === 'force' ? (
        <ForceLayout
          data={filteredData}
          sizeMax={sizeMax}
          degree={numFeatures}
          view={view}
          metric={metric}
        />
      ) : (
        <StickyForceLayout
          data={filteredData}
          sizeMax={sizeMax}
          degree={numFeatures}
          view={view}
          metric={metric}
        />
      )}
    </div>
  );
};

export default Main;
