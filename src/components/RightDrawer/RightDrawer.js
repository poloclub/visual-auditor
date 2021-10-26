import React from 'react';
import Drawer from '@mui/material/Drawer';
import './RightDrawer.css';

const RightDrawer = () => {
  const features = [
    'Age',
    'Workclass',
    'Education',
    'Education-Num',
    'Marital Status',
    'Occupation',
    'Relationship',
    'Race',
    'Sex',
    'Capital Gain',
    'Capital Loss',
    'Hours Per Week',
    'Country',
    'Target',
  ];
  return (
    <Drawer
      sx={{
        width: '15rem',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '15rem',
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='right'
    >
      <div className='right-container'>
        <h1>Frequency Distributions:</h1>
        {features.map((feature) => (
          <p key={feature}>{feature}</p>
        ))}
      </div>
    </Drawer>
  );
};

export default RightDrawer;
