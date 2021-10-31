import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import './Nav.css';

const Nav = ({ view, setView }) => {
  const handleViewChange = (event) => {
    setView(event.target.value);
  };
  return (
    <div className='nav-container'>
      <h1>Adults Dataset</h1>
      <FormControl sx={{ s: 1, minWidth: 175 }}>
        <InputLabel>View:</InputLabel>
        <Select value={view} label='View' onChange={handleViewChange}>
          <MenuItem value={'bar'}>Bar Graph</MenuItem>
          <MenuItem value={'force'}>Force Layout</MenuItem>
          <MenuItem value={'graph'}>Graph Layout</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Nav;
