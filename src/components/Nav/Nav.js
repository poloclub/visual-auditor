import React from 'react';
import Button from '@mui/material/Button';
import './Nav.css';

const Nav = ({ view, setView }) => {
  const handleViewClick = (event) => {
    if (view === 'bar') {
      setView('graph');
    } else {
      setView('bar');
    }
  };
  return (
    <div className='nav-container'>
      <h1>Adults Dataset</h1>
      <Button variant='outlined' onClick={handleViewClick}>
        Switch View
      </Button>
    </div>
  );
};

export default Nav;
