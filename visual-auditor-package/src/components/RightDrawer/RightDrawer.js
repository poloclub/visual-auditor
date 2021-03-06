import React from 'react';
import Drawer from '@mui/material/Drawer';
import './RightDrawer.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RedGradient from './RedGradient.png';
import BlueGradient from './BlueGradient.png';

const RightDrawer = ({ details, metric, overperforming, view, convexHull }) => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    open ? (
    <Drawer
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15rem' },
      }}
      variant='persistent'
      anchor='right'
      open={open}
    >
      {' '}
      {view === 'bar' ? (
          <div className='right-container'>
            <ArrowForwardIosIcon onClick={handleDrawerClose} style={{position: 'relative', left: '-5rem', top: '1rem', opacity: '0.75', cursor: 'pointer'}}/>
            <h1>Legend</h1>
            <div style={{ paddingTop: '0.25rem', lineHeight: '0.5rem' }}>
              <p>
                <strong>Bar Color:</strong>
              </p>
              <p>Performance</p>
            </div>
            {/* <img
              src={overperforming ? BlueGradient : RedGradient}
              alt='Gradient'
              style={{
                width: '13rem',
                padding: '0',
                margin: '0',
                paddingLeft: '0.9rem',
              }}
            /> */}
          </div>
        ) : (
            <div className='right-container'>
            <ArrowForwardIosIcon onClick={handleDrawerClose} style={{position: 'relative', left: '-5rem', top: '1rem', opacity: '0.75', cursor: 'pointer'}}/>
            <h1>Legend</h1>
            <div style={{ paddingTop: '0.25rem', lineHeight: '0.5rem' }}>
              <p>
                <strong>Node Color:</strong>
              </p>
              <p>Performance</p>
            </div>
            <div style={{ paddingTop: '0.25rem', lineHeight: '0.5rem' }}>
              <p>
                <strong>Node Size:</strong>
              </p>
              <p>Slice Sample Size</p>
            </div>
            {view === 'graph' && (
              <div style={{ paddingTop: '0.25rem', lineHeight: '0.5rem' }}>
                <p>
                  <strong>Graph Edges:</strong>
                </p>
                <p>Overlapping Samples</p>
              </div>
            )}
            {convexHull && (
              <div style={{ paddingTop: '0.25rem', lineHeight: '0.5rem' }}>
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
            <div style={{ paddingTop: '0.25rem', lineHeight: '0.5rem' }}>
              <p>
                <strong>Slice Definition:</strong>
              </p>
              {details.slice.split(', ').map((feature) => {
                return <p>{feature}</p>;
              })}
            </div>
            <div style={{ paddingTop: '0.25rem', lineHeight: '0.5rem' }}>
              <p>
                <strong>Slice Size:</strong>
              </p>
              <p> {details?.size} samples</p>
            </div>
            <div style={{ paddingTop: '0.25rem', lineHeight: '0.5rem' }}>
              <p>
                <strong>Slice {metric}:</strong>
              </p>
              <p>{details?.metric?.toFixed(3)}</p>
            </div>
            {details?.similarSlices?.length > 0 ? (
              <div style={{ paddingTop: '0.25rem', lineHeight: '1.25rem' }}>
                <p>
                  <strong>Similar Slices:</strong>
                </p>
                <ul className='similar-slices-list'>
                  {details?.similarSlices.map((slice) => (
                    <li className='similar-slice'>{slice}</li>
                  ))}
                </ul>
              </div>
            ) : null}
        </div>
      )}
      </Drawer>) :
      <ArrowBackIosIcon onClick={handleDrawerOpen} style={{position: 'absolute', right: '2rem', top: '2rem', cursor: 'pointer', opacity: '0.75'}}>Open</ArrowBackIosIcon>
  );
};

export default RightDrawer;
