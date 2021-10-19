import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import './LeftDrawer.css';

const LeftDrawer = ({
  numFeatures,
  setNumFeatures,
  sampleSize,
  setSampleSize,
  metric,
  setMetric,
}) => {
  const handleFeaturesChange = (event) => {
    setNumFeatures(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSampleSize(event.target.value);
  };

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  const handleReset = (event) => {
    setNumFeatures(1);
    setSampleSize(0);
    setMetric('log loss');
  };

  return (
    <Drawer
      variant='permanent'
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15rem' },
      }}
      open
    >
      <div className='left-container'>
        <h1>Slice Filters:</h1>
        <h2>Number of Features:</h2>
        <Slider
          aria-label='Number of Features'
          defaultValue={2}
          value={numFeatures}
          valueLabelDisplay='auto'
          step={1}
          marks
          min={1}
          max={4}
          size='small'
          onChange={handleFeaturesChange}
        />
        <h2>Minimum Sample Size:</h2>
        <Slider
          size='small'
          defaultValue={100}
          aria-label='Small'
          value={sampleSize}
          valueLabelDisplay='auto'
          min={0}
          max={1500}
          step={10}
          onChange={handleSizeChange}
        />
        <h2>Fairness Metric:</h2>
        <FormControl sx={{ m: 1, minWidth: 175 }}>
          <InputLabel id='demo-simple-select-helper-label'>Metric</InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={metric}
            label='Metric'
            onChange={handleMetricChange}
          >
            <MenuItem value={'log loss'}>Log Loss</MenuItem>
            <MenuItem value={'accuracy'}>Accuracy</MenuItem>
            <MenuItem value={'precision'}>Precision</MenuItem>
            <MenuItem value={'recall'}>Recall</MenuItem>
            <MenuItem value={'specificity'}>Specificity</MenuItem>
            <MenuItem value={'f1'}>F1</MenuItem>
            <MenuItem value={'false negative rate'}>
              False Negative Rate
            </MenuItem>
            <MenuItem value={'false positive rate'}>
              False Positive Rate
            </MenuItem>
          </Select>
        </FormControl>
        <Divider style={{ padding: '1rem' }} />
        <Button
          variant='outlined'
          onClick={handleReset}
          style={{ marginTop: '1rem' }}
        >
          Reset
        </Button>
      </div>
    </Drawer>
  );
};

export default LeftDrawer;
