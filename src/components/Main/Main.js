import React from 'react';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import { data } from '../../data/data';

const Main = ({ numFeatures, sampleSize, metric }) => {
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
