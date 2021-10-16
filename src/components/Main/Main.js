import React from 'react';
import BarChart from './BarChart';
import SliceBarChart from './SliceBarChart';
import './Main.css';
import { data } from '../../data/data';
import { degree1 } from '../../data/degree1';

const Main = ({ numFeatures, sampleSize, metric }) => {
  const filteredData = degree1.filter((obj) => obj.size >= sampleSize);
  return (
    <div className='main-container'>
      {/* <BarChart data={data} /> */}
      <SliceBarChart data={filteredData} minSize={100} />
    </div>
  );
};

export default Main;
