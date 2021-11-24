import React from 'react';
import Drawer from '@mui/material/Drawer';
import './RightDrawer.css';

const RightDrawer = ({ details, metric }) => {
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
      {' '}
      {details === null ? (
        <div className='right-container'>
          <h1>Selected Slice:</h1>
          <p className='thin'>Click on a slice to view the slice details</p>
        </div>
      ) : (
        <div className='right-container'>
          <h1>Selected Slice:</h1>
          <h2>Definition:</h2>
          <p>{details?.slice}</p>
          <h2>Slice Size:</h2>
          <p>{details?.size} samples</p>
          <h2>{metric}:</h2>
          <p>{details?.metric?.toFixed(3)}</p>
          {details?.similarSlices?.length > 0 ? <h2>Similar Slices:</h2> : null}
          {details?.similarSlices.map((slice) => (
            <p>{slice}</p>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default RightDrawer;
