import React from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import logloss from '../../data/logloss.json';
import accuracy from '../../data/accuracy.json';
import precision from '../../data/precision.json';
import reverselogloss from '../../data/reverselogloss.json';
import ForceLayout from './ForceLayout';
import GraphLayout from './GraphLayout';
import GraphLayout2 from './GraphLayout2';

const Main = ({
  numFeatures,
  sampleSize,
  metric,
  view,
  sortBy,
  overperforming,
}) => {
  let data;
  let reversedata;
  let modelMetric;
  if (overperforming) {
    switch (metric) {
      case 'Log Loss':
        data = Object.values(reverselogloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(logloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        data.forEach((d) => (d.metric = Math.abs(d.metric)));
        modelMetric = reverselogloss['model'];
        break;
      case 'Accuracy':
        data = Object.values(accuracy['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(accuracy['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = accuracy['model'];
        break;
      case 'Precision':
        data = Object.values(precision['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(precision['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = precision['model'];
        break;
      default:
        data = Object.values(reverselogloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = reverselogloss['model'];
    }
  } else {
    switch (metric) {
      case 'Log Loss':
        data = Object.values(logloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = [];
        modelMetric = logloss['model'];
        break;
      case 'Accuracy':
        data = Object.values(accuracy['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = [];
        modelMetric = accuracy['model'];
        break;
      case 'Precision':
        data = Object.values(precision['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = [];
        modelMetric = precision['model'];
        break;
      default:
        data = Object.values(logloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = [];
        modelMetric = logloss['model'];
    }
  }
  const metricArray = data.map((obj) => obj.metric);
  const reverseMetricArray = reversedata.map((obj) => obj.metric);
  const sizeArray = data.map((obj) => obj.size);
  const max = Math.max(...metricArray, ...reverseMetricArray);
  const sizeMax = Math.max(...sizeArray);
  let filteredData = data
    .filter((obj) => obj.size >= sampleSize)
    .filter((obj) => obj.degree <= numFeatures)
    .sort(function (a, b) {
      if (sortBy === 'size') return b.size - a.size;
      if (overperforming) return a.metric - b.metric;
      return b.metric - a.metric;
    });
  if (view === 'bar') {
    filteredData = filteredData.slice(0, 10);
  }
  return (
    <div className='main-container' style={{ display: 'block' }}>
      {view === 'bar' ? (
        <SliceBarChart
          data={filteredData}
          model={modelMetric}
          max={max}
          view={view}
        />
      ) : view === 'force' ? (
        <ForceLayout
          data={filteredData}
          degree={numFeatures}
          view={view}
          metric={metric}
          model={modelMetric}
        />
      ) : (
        <GraphLayout2
          data={filteredData}
          degree={numFeatures}
          metric={metric}
          model={modelMetric}
        />
      )}
    </div>
  );
};

export default Main;
