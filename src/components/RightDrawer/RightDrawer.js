import React from 'react';
import Drawer from '@mui/material/Drawer';
import './RightDrawer.css';
import RedGradient from './RedGradientLarge.png';
import BlueGradient from './BlueGradientLarge.png';

const RightDrawer = ({ details, metric, overperforming, view, convexHull }) => {
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
      {view === 'bar' ? (
        <div className='right-container'>
          <h1>Legend</h1>
          <div style={{ paddingTop: '0.25rem', lineHeight: '0.25rem' }}>
            <p>
              <strong>Bar Color:</strong>
            </p>
            <p>Performance</p>
          </div>
          <img
            src={overperforming ? BlueGradient : RedGradient}
            alt='Gradient'
            style={{
              width: '13rem',
              padding: '0',
              margin: '0',
              paddingLeft: '0.9rem',
            }}
          />
        </div>
      ) : (
        <div className='right-container'>
          <h1>Legend</h1>
          <div style={{ paddingTop: '0.25rem', lineHeight: '0.25rem' }}>
            <p>
              <strong>Node Color:</strong>
            </p>
            <p>Performance</p>
          </div>
          <img
            src={overperforming ? BlueGradient : RedGradient}
            alt='Gradient'
            style={{
              width: '13rem',
              padding: '0',
              margin: '0',
              paddingLeft: '0.9rem',
            }}
          />
          <div style={{ paddingTop: '0.25rem', lineHeight: '0.25rem' }}>
            <p>
              <strong>Node Size:</strong>
            </p>
            <p>Slice Sample Size</p>
          </div>
          {view === 'graph' && (
            <div style={{ paddingTop: '0.25rem', lineHeight: '0.25rem' }}>
              <p>
                <strong>Graph Edges:</strong>
              </p>
              <p>Overlapping Samples</p>
            </div>
          )}
          {convexHull && (
            <div style={{ paddingTop: '0.25rem', lineHeight: '0.25rem' }}>
              <p>
                <strong>Convex Hull:</strong>
              </p>
              <p>Same Features</p>
            </div>
          )}
        </div>
      )}
      {details === null ? (
        <div className='right-container'>
          <h1>Selected Slice</h1>
          <p className='thin'>Click on a slice to view the slice details</p>
        </div>
      ) : (
        <div className='right-container'>
          <h1>Selected Slice</h1>
          <div style={{ paddingTop: '0.25rem', lineHeight: '0.25rem' }}>
            <p>
              <strong>Slice Definition:</strong>
            </p>
            <p>{details?.slice}</p>
          </div>
          <div style={{ paddingTop: '0.25rem', lineHeight: '0.25rem' }}>
            <p>
              <strong>Slice Size:</strong>
            </p>
            <p> {details?.size} samples</p>
          </div>
          <div style={{ paddingTop: '0.25rem', lineHeight: '0.25rem' }}>
            <p>
              <strong>Slice {metric}:</strong>
            </p>
            <p>{details?.metric?.toFixed(3)}</p>
          </div>
          {/* {details?.similarSlices?.length > 0 ? <h2>Similar Slices:</h2> : null}
          {details?.similarSlices.map((slice) => (
            <p>{slice}</p>
          ))} */}
        </div>
      )}
    </Drawer>
  );
};

export default RightDrawer;
