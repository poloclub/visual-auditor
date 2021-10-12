import React from 'react';
import Button from '@mui/material/Button';
import './Nav.css';

const Nav = () => {
  return (
    <div className='nav-container'>
      <h1>Adults Dataset</h1>
      <Button variant='outlined'>Select Model</Button>
    </div>
  );
};

export default Nav;
