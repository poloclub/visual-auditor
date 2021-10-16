import React from 'react';
import BarChart from './BarChart';
import BarPlot from './BarPlot';
import './Main.css';
import { data } from '../../data/data';

const Main = () => {
  return (
    <div className='main-container'>
      <BarChart data={data} />
    </div>
  );
};

export default Main;
