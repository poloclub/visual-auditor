import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import './Nav.css';

const ModalNav = ({
  view,
  setView,
  pointerMode,
  setPointerMode,
  edgeThickness,
  setEdgeThickness,
}) => {
  const [thicknessValue, setThicknessValue] = React.useState(edgeThickness);
  const [pointerModeValue, setPointerModeValue] = React.useState(pointerMode);
  const [open, setOpen] = React.useState(false);
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleSettingsOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setEdgeThickness(thicknessValue);
    setOpen(false);
    setPointerMode(pointerModeValue);
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
          <MenuItem value={'bar'}>Bar Chart Layout</MenuItem>
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
          <h2>Cursor Mode:</h2>
          <FormControl sx={{ s: 1, minWidth: 175 }}>
            <InputLabel>Cursor Mode:</InputLabel>
            <Select
              value={pointerModeValue}
              label='Cursor Mode'
              onChange={(event) => setPointerModeValue(event.target.value)}
            >
              <MenuItem value={'select'}>Select</MenuItem>
              <MenuItem value={'drag'}>Drag</MenuItem>
            </Select>
          </FormControl>
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

export default ModalNav;
