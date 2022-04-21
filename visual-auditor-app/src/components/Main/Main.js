import React, { memo } from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import ForceLayout from './ForceLayout';
import GraphLayout from './GraphLayout';

import logloss from '../../data/logloss.json';
import reverselogloss from '../../data/reverselogloss.json';

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
  show,
  algorithm,
  setShowConvexHull,
  nodeSize,
  nodeColor
}) => {
  let data;
  let reversedata;
  let modelMetric;
  if (overperforming) {
    data = Object.values(reverselogloss['data']).map(
      (obj) => Object.values(obj)[0]
    );
    reversedata = Object.values(logloss['data']).map(
      (obj) => Object.values(obj)[0]
    );
    modelMetric = reverselogloss['model'];
  } else {
    data = Object.values(logloss['data']).map(
      (obj) => Object.values(obj)[0]);
    reversedata = Object.values(reverselogloss['data']).map(
      (obj) => Object.values(obj)[0]
    );
    modelMetric = logloss['model']
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
      if (sortBy === 'loss') {
        if (overperforming) return a.metric - b.metric;
        return b.metric - a.metric;
      }
      if (sortBy === 'accuracy') {
        if (overperforming) return b.accuracy - a.accuracy;
        return a.accuracy - b.accuracy;
      }  
      if (overperforming) return a.metric - b.metric;
        return b.metric - a.metric;
    });
  if (view === 'bar') {
    filteredData = filteredData.slice(0, 10);
  } else {
    filteredData = filteredData.slice(0, show);
  }
  return (
    <div className='main-container' style={{ display: 'block', margin: 'auto', width: '75%'}}>
      {view === 'bar' ? (
        <SliceBarChart
          data={filteredData}
          model={modelMetric}
          max={max}
          view={view}
          overperforming={overperforming}
          metric={metric}
          setDetails={setDetails}
          nodeSize={nodeSize}
          nodeColor={nodeColor}
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
          setShowConvexHull={setShowConvexHull}
          nodeSize={nodeSize}
          nodeColor={nodeColor}
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
          algorithm={algorithm}
          setShowConvexHull={setShowConvexHull}
          nodeSize={nodeSize}
          nodeColor={nodeColor}
        />
      )}
    </div>
  );
};

export default memo(Main);
