import React from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import logloss from '../../data/logloss.json';
import accuracy from '../../data/accuracy.json';

const Main = ({ numFeatures, sampleSize, metric }) => {
  let data;
  switch (metric) {
    case 'log loss':
      data = Object.values(logloss['data']).map((obj) => Object.values(obj)[0]);
    case 'accuracy':
      data = Object.values(accuracy['data']).map(
        (obj) => Object.values(obj)[0]
      );
    default:
      data = Object.values(logloss['data']).map((obj) => Object.values(obj)[0]);
  }
  const filteredData = data
    .filter((obj) => obj.size >= sampleSize)
    .filter((obj) => obj.degree <= numFeatures)
    .sort(function (a, b) {
      return a.metric - b.metric;
    })
    .slice(0, 10);
  return (
    <div className='main-container'>
      <SliceBarChart data={filteredData} minSize={100} />
    </div>
  );
};

export default Main;
