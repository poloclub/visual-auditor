import React from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import logloss from '../../data/logloss.json';
import accuracy from '../../data/accuracy.json';
import precision from '../../data/precision.json';
import ForceLayout from './ForceLayout';

const Main = ({ numFeatures, sampleSize, metric, view }) => {
  let data;
  let modelMetric;
  switch (metric) {
    case 'log loss':
      data = Object.values(logloss['data']).map((obj) => Object.values(obj)[0]);
      modelMetric = logloss['model'];
      break;
    case 'accuracy':
      data = Object.values(accuracy['data']).map(
        (obj) => Object.values(obj)[0]
      );
      modelMetric = accuracy['model'];
      break;
    case 'precision':
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
      return b.metric - a.metric;
    });
  if (view === 'bar') {
    filteredData = filteredData.slice(0, 10);
  }
  return (
    <div className='main-container'>
      {view === 'bar' ? (
        <SliceBarChart data={filteredData} model={modelMetric} max={max} />
      ) : (
        <ForceLayout
          data={filteredData}
          model={modelMetric}
          max={max}
          sizeMax={sizeMax}
          degree={numFeatures}
          view={view}
        />
      )}
    </div>
  );
};

export default Main;
