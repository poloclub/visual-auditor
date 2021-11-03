import React from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import logloss from '../../data/logloss.json';
import accuracy from '../../data/accuracy.json';
import precision from '../../data/precision.json';
import recall from '../../data/recall.json';
import f1 from '../../data/f1.json';
import reverselogloss from '../../data/reverselogloss.json';
import reverseaccuracy from '../../data/reverseaccuracy.json';
import reverseprecision from '../../data/precision.json';
import reverserecall from '../../data/recall.json';
import reversef1 from '../../data/reversef1.json';
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
        modelMetric = reverselogloss['model'];
        break;
      case 'Accuracy':
        data = Object.values(reverseaccuracy['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(accuracy['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = reverseaccuracy['model'];
        break;
      case 'Precision':
        data = Object.values(reverseprecision['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(precision['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = reverseprecision['model'];
        break;
      case 'Recall':
        data = Object.values(reverserecall['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(recall['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = reverserecall['model'];
        break;
      case 'F1':
        data = Object.values(reversef1['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(f1['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = reversef1['model'];
        break;
      default:
        data = Object.values(reverselogloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(logloss['data']).map(
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
        reversedata = Object.values(reverselogloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = logloss['model'];
        break;
      case 'Accuracy':
        data = Object.values(accuracy['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(reverseaccuracy['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = accuracy['model'];
        break;
      case 'Precision':
        data = Object.values(precision['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(reverseprecision['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = precision['model'];
        break;
      case 'Recall':
        data = Object.values(recall['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(reverserecall['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = recall['model'];
        break;
      case 'F1':
        data = Object.values(f1['data']).map((obj) => Object.values(obj)[0]);
        reversedata = Object.values(reversef1['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = f1['model'];
        break;
      default:
        data = Object.values(logloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        reversedata = Object.values(reverselogloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric = logloss['model'];
    }
  }
  const metricArray = data.map((obj) => obj.metric);
  const reverseMetricArray = reversedata.map((obj) => obj.metric);
  const sizeArray = data.map((obj) => obj.size);
  const max = Math.max(...metricArray, ...reverseMetricArray, modelMetric);
  const sizeMax = Math.max(...sizeArray);
  let filteredData = data
    .filter((obj) => obj.size >= sampleSize)
    .filter((obj) => obj.degree <= numFeatures)
    .sort(function (a, b) {
      if (sortBy === 'size') return b.size - a.size;
      if (metric == 'Log Loss') {
        if (overperforming) return a.metric - b.metric;
        return b.metric - a.metric;
      } else {
        if (overperforming) return b.metric - a.metric;
        return a.metric - b.metric;
      }
    });
  if (view === 'bar') {
    filteredData = filteredData.slice(0, 10);
  } else {
    filteredData = filteredData.slice(0, 100);
  }
  return (
    <div className='main-container' style={{ display: 'block' }}>
      {view === 'bar' ? (
        <SliceBarChart
          data={filteredData}
          model={modelMetric}
          max={max}
          view={view}
          overperforming={overperforming}
          metric={metric}
        />
      ) : view === 'force' ? (
        <ForceLayout
          data={filteredData}
          degree={numFeatures}
          view={view}
          metric={metric}
          model={modelMetric}
          overperforming={overperforming}
        />
      ) : (
        <GraphLayout2
          data={filteredData}
          degree={numFeatures}
          metric={metric}
          model={modelMetric}
          overperforming={overperforming}
        />
      )}
    </div>
  );
};

export default Main;
