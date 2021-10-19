import React from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
// import { data } from '../../data/data';
import logloss from '../../data/logloss.json';

const Main = ({ numFeatures, sampleSize, metric }) => {
  const data = Object.values(logloss['data']).map(
    (obj) => Object.values(obj)[0]
  );
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
