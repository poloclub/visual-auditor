import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import './Nav.css';

const Nav = ({
  view,
  setView,
  radius,
  setRadius,
  edgeFiltering,
  setEdgeFiltering,
  edgeThickness,
  setEdgeThickness,
  edgeForce,
  setEdgeForce,
}) => {
  const [edgeValue, setEdgeValue] = React.useState(edgeFiltering);
  const [radiusValue, setRadiusValue] = React.useState(radius);
  const [thicknessValue, setThicknessValue] = React.useState(edgeThickness);
  const [edgeForceValue, setEdgeForceValue] = React.useState(edgeForce);
  const [open, setOpen] = React.useState(false);
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleSettingsOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setEdgeFiltering(edgeValue);
    setRadius(radiusValue);
    setEdgeThickness(thicknessValue);
    setEdgeForce(edgeForceValue);
    setOpen(false);
  };

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '0.5rem',
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
      {view === 'graph' && (
        <SettingsOutlinedIcon
          className='settings'
          onClick={handleSettingsOpen}
        />
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={boxStyle}>
          <h1>Settings</h1>
          <h2>Radius Function:</h2>
          <FormControl sx={{ s: 1, minWidth: 175 }}>
            <InputLabel>Radius:</InputLabel>
            <Select
              value={radiusValue}
              label='Radius'
              onChange={(event) => setRadiusValue(event.target.value)}
            >
              <MenuItem value={'log'}>Log</MenuItem>
              <MenuItem value={'sqrt'}>Square Root</MenuItem>
            </Select>
          </FormControl>
          <h2>Edge Filtering:</h2>
          <Slider
            aria-label='Edge Filtering'
            defaultValue={300}
            value={edgeValue}
            valueLabelDisplay='auto'
            step={10}
            min={0}
            max={1000}
            size='small'
            onChange={(event) => setEdgeValue(event.target.value)}
          />
          <h2>Edge Thickness:</h2>
          <Slider
            aria-label='Edge Thickness'
            defaultValue={1}
            value={thicknessValue}
            valueLabelDisplay='auto'
            step={0.1}
            min={0}
            max={10}
            size='small'
            onChange={(event) => setThicknessValue(event.target.value)}
          />
          <h2>Edge Force Strength:</h2>
          <Slider
            aria-label='Edge Force Strength'
            defaultValue={1}
            value={edgeForceValue}
            valueLabelDisplay='auto'
            step={0.1}
            min={0}
            max={10}
            size='small'
            onChange={(event) => setEdgeForceValue(event.target.value)}
          />
          <div>
            <Button
              variant='outlined'
              type='submit'
              onClick={handleSubmit}
              style={{ marginTop: '1rem' }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Nav;
