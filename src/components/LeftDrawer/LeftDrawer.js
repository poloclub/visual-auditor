import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import './LeftDrawer.css';

const LeftDrawer = ({
  numFeatures,
  setNumFeatures,
  sampleSize,
  setSampleSize,
  metric,
  setMetric,
  sortBy,
  setSortBy,
  overperforming,
  setOverperforming,
  features,
  setFeatures,
  view,
  radius,
  setRadius,
  edgeFiltering,
  setEdgeFiltering,
  edgeForce,
  setEdgeForce,
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

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setOverperforming(event.target.checked);
  };

  const handleCheckboxChange = (event, label) => {
    if (event.target.checked) {
      setFeatures([...features, label]);
    } else {
      setFeatures(features.filter((feature) => feature !== label));
    }
  };

  const handleReset = (event) => {
    setNumFeatures(2);
    setSampleSize(0);
    setMetric('Log Loss');
    setSortBy('metric');
    setOverperforming(false);
    setEdgeFiltering(300);
    setEdgeForce(1);
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
          max={3}
          size='small'
          onChange={handleFeaturesChange}
        />
        <h2>Minimum Slice Size:</h2>
        <Slider
          size='small'
          defaultValue={100}
          aria-label='Small'
          value={sampleSize}
          valueLabelDisplay='auto'
          min={0}
          max={250}
          step={10}
          onChange={handleSizeChange}
        />
        {view === 'graph' && (
          <>
            <h2>Edge Filtering:</h2>
            <Slider
              aria-label='Edge Filtering'
              defaultValue={300}
              value={edgeFiltering}
              valueLabelDisplay='auto'
              step={10}
              min={0}
              max={1000}
              size='small'
              onChange={(event) => setEdgeFiltering(event.target.value)}
            />
            <h2>Edge Force Strength:</h2>
            <Slider
              aria-label='Edge Force Strength'
              defaultValue={1}
              value={edgeForce}
              valueLabelDisplay='auto'
              step={0.01}
              min={0}
              max={5}
              size='small'
              onChange={(event) => setEdgeForce(event.target.value)}
            />
          </>
        )}
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
            <MenuItem value={'Log Loss'}>Log Loss</MenuItem>
            <MenuItem value={'Accuracy'}>Accuracy</MenuItem>
            <MenuItem value={'Precision'}>Precision</MenuItem>
            <MenuItem value={'Recall'}>Recall</MenuItem>
            <MenuItem value={'F1'}>F1</MenuItem>
          </Select>
        </FormControl>
        {view === 'bar' ? (
          <>
            <h2>Order By:</h2>
            <FormControl sx={{ m: 1, minWidth: 175 }}>
              <InputLabel id='demo-simple-select-helper-label'>
                Order By:
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={sortBy}
                label='Order By'
                onChange={handleSortByChange}
              >
                <MenuItem value={'metric'}>{metric}</MenuItem>
                <MenuItem value={'size'}>Sample Size</MenuItem>
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            <h2>Radius Function:</h2>
            <FormControl sx={{ s: 1, minWidth: 175 }}>
              <InputLabel>Radius:</InputLabel>
              <Select
                value={radius}
                label='Radius'
                onChange={(event) => setRadius(event.target.value)}
              >
                <MenuItem value={'log'}>Log</MenuItem>
                <MenuItem value={'sqrt'}>Square Root</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        <h2>Overperforming Slices:</h2>
        <Switch
          checked={overperforming}
          onChange={handleSwitchChange}
          label='Overperforming Slices'
        />
        <h2>Select Features:</h2>
        <FormGroup style={{ marginLeft: '1rem' }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Age'
            onChange={(event) => handleCheckboxChange(event, 'Age')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Workclass'
            onChange={(event) => handleCheckboxChange(event, 'Workclass')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Education'
            onChange={(event) => handleCheckboxChange(event, 'Education')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Education-Num'
            onChange={(event) => handleCheckboxChange(event, 'Education-Num')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Marital Status'
            onChange={(event) => handleCheckboxChange(event, 'Marital Status')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Occupation'
            onChange={(event) => handleCheckboxChange(event, 'Occupation')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Relationship'
            onChange={(event) => handleCheckboxChange(event, 'Relationship')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Race'
            onChange={(event) => handleCheckboxChange(event, 'Race')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Sex'
            onChange={(event) => handleCheckboxChange(event, 'Sex')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Capital Gain'
            onChange={(event) => handleCheckboxChange(event, 'Capital Gain')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Capital Loss'
            onChange={(event) => handleCheckboxChange(event, 'Capital Loss')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Hours Per Week'
            onChange={(event) => handleCheckboxChange(event, 'Hours Per Week')}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Country'
            onChange={(event) => handleCheckboxChange(event, 'Country')}
          />
        </FormGroup>
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
