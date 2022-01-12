import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import './Nav.css';

const Nav = ({ view, setView, algorithm, setAlgorithm }) => {
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  return (
    <div className='nav-container'>
      <h1>Adults Dataset</h1>
      <FormControl sx={{ s: 1, minWidth: 175, paddingRight: 1 }}>
        <InputLabel>View:</InputLabel>
        <Select value={view} label='View' onChange={handleViewChange}>
          <MenuItem value={'bar'}>Bar Chart Layout</MenuItem>
          <MenuItem value={'force'}>Force Layout</MenuItem>
          <MenuItem value={'graph'}>Graph Layout</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ s: 2, minWidth: 175, paddingRight: 1 }}>
        <InputLabel>Algorithm:</InputLabel>
        <Select
          value={algorithm}
          label='Algorithm'
          onChange={handleAlgorithmChange}
        >
          <MenuItem value={'slicefinder'}>Slice Finder</MenuItem>
          <MenuItem value={'sliceline'}>Slice Line</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Nav;
