import React from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import ForceLayout from './ForceLayout';
import GraphLayout from './GraphLayout';

import logloss from '../../data/logloss.json';
import accuracy from '../../data/accuracy.json';
import precision from '../../data/precision.json';
import recall from '../../data/recall.json';
import f1 from '../../data/f1.json';
import reverselogloss from '../../data/reverselogloss.json';
import reverseaccuracy from '../../data/reverseaccuracy.json';
import reverseprecision from '../../data/reverseprecision.json';
import reverserecall from '../../data/reverserecall.json';
import reversef1 from '../../data/reversef1.json';
import logloss_sliceline from '../../data/logloss_sliceline.json';

const Main = ({
  numFeatures,
  sampleSize,
  metric,
  view,
  sortBy,
  overperforming,
  features,
  radius,
  edgeFiltering,
  edgeForce,
  setDetails,
  cursorMode,
  algorithm,
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
        data = Object.values(
          algorithm === 'slicefinder'
            ? logloss['data']
            : logloss_sliceline['data']
        ).map((obj) => Object.values(obj)[0]);
        reversedata = Object.values(reverselogloss['data']).map(
          (obj) => Object.values(obj)[0]
        );
        modelMetric =
          algorithm === 'slicefinder'
            ? logloss['model']
            : logloss_sliceline['model'];
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
  const max = Math.max(...metricArray, ...reverseMetricArray, modelMetric);
  let filteredData = data
    .filter((obj) => {
      let sliceStr = obj.slice;
      while (sliceStr.includes(':')) {
        if (features.includes(sliceStr.substring(0, sliceStr.indexOf(':')))) {
          return true;
        }
        sliceStr = sliceStr.substring(sliceStr.indexOf(':') + 1);
      }
      return false;
    })
    .filter((obj) => obj.size >= sampleSize)
    .filter((obj) => obj.degree <= numFeatures)
    .sort(function (a, b) {
      if (sortBy === 'size') return b.size - a.size;
      if (metric === 'Log Loss') {
        if (overperforming) return a.metric - b.metric;
        return b.metric - a.metric;
      } else {
        if (overperforming) return b.metric - a.metric;
        return a.metric - b.metric;
      }
    });
  console.log(filteredData);
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
          setDetails={setDetails}
        />
      ) : view === 'force' ? (
        <ForceLayout
          data={filteredData}
          degree={numFeatures}
          view={view}
          metric={metric}
          model={modelMetric}
          overperforming={overperforming}
          setDetails={setDetails}
          radius={radius}
        />
      ) : (
        <GraphLayout
          data={filteredData}
          degree={numFeatures}
          metric={metric}
          model={modelMetric}
          overperforming={overperforming}
          radiusType={radius}
          edgeFiltering={edgeFiltering}
          edgeForce={edgeForce}
          setDetails={setDetails}
          cursorMode={cursorMode}
        />
      )}
    </div>
  );
};

export default Main;
