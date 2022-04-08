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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import featuresData from '../../data/features.json'
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
  cursorMode,
  setCursorMode,
  showConvexHull,
  setShowConvexHull,
}) => {
  const [switchDisabled, setSwitchDisabled] = React.useState(false);

  const handleFeaturesChange = (event) => {
    setNumFeatures(event.target.value);
    setShowConvexHull(false);
  };

  const handleSizeChange = (event) => {
    setSampleSize(event.target.value);
    setShowConvexHull(false);
  };

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
    setShowConvexHull(false);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setShowConvexHull(false);
  };

  const handleSwitchChange = (event) => {
    setOverperforming(event.target.checked);
    setShowConvexHull(false);
  };

  const handleCheckboxChange = (event, label) => {
    if (event.target.checked) {
      setFeatures([...features, label]);
    } else {
      setFeatures(features.filter((feature) => feature !== label));
    }
    setShowConvexHull(false);
  };

  const handleReset = (event) => {
    setFeatures(featuresData.features);
    setNumFeatures(2);
    setSampleSize(0);
    setMetric('Log Loss');
    setSortBy('metric');
    setOverperforming(false);
    setEdgeFiltering(300);
    setEdgeForce(1);
    setShowConvexHull(false);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15rem' },
      }}
    >
      <div className='left-container'>
        <h1>Slice Filters</h1>
        <p><strong>Number of Features:</strong></p>
        <Box sx={{width: '10rem', margin: '1rem'}}>
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
            width='50%'
            onChange={handleFeaturesChange}
          />
        </Box>
        <p><strong>Minimum Slice Size:</strong></p>
        <Box sx={{width: '10rem', margin: '1rem'}}>
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
        </Box>
        {view === 'graph' && (
          <>
            <h2>Edge Filtering:</h2>
            <TextField
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label="Edge Filtering"
              variant="outlined"
              value={edgeFiltering}
              valueLabelDisplay='auto'
              defaultValue={300}
              onChange={(event) => {
                setEdgeFiltering(event.target.value);
                setShowConvexHull(false);
              }}
            />
            <Slider
              aria-label='Edge Filtering'
              value={edgeFiltering}
              valueLabelDisplay='auto'
              step={10}
              min={0}
              max={1000}
              size='small'
              onChange={(event) => {
                setEdgeFiltering(event.target.value);
                setShowConvexHull(false);
              }}
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
              onChange={(event) => {
                setEdgeForce(event.target.value);
                setShowConvexHull(false);
              }}
            />
            <h2>Cursor Mode:</h2>
            <FormControl sx={{ s: 1, minWidth: 175 }}>
              <InputLabel>Mode:</InputLabel>
              <Select
                value={cursorMode}
                label='Mode'
                onChange={(event) => {
                  setCursorMode(event.target.value);
                  setShowConvexHull(false);
                }}
              >
                <MenuItem value={'drag'}>Drag</MenuItem>
                <MenuItem value={'select'}>Select</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        {/* <h2>Fairness Metric:</h2>
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
        </FormControl> */}
        {view === 'bar' ? (
          <>
            <p><strong>Order By:</strong></p>
            <FormControl sx={{ m: 0, minWidth: 175 }}>
              <Select
                value={sortBy}
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
                onChange={(event) => {
                  setRadius(event.target.value);
                  setShowConvexHull(false);
                }}
              >
                <MenuItem value={'log'}>Log</MenuItem>
                <MenuItem value={'sqrt'}>Square Root</MenuItem>
              </Select>
            </FormControl>
            <h2>Show Convex Hull:</h2>
            <Switch
              checked={showConvexHull}
              onChange={(event) => {
                if (event.target.checked) {
                  setSwitchDisabled(true);
                  setTimeout(() => {
                    setSwitchDisabled(false);
                  }, 4000);
                }
                setShowConvexHull(event.target.checked);
              }}
              label='Show Convex Hull'
              className='switch'
              disabled={switchDisabled}
            />
          </>
        )}
        <p><strong>Overperforming Slices:</strong></p>
        <Switch
          checked={overperforming}
          onChange={handleSwitchChange}
          label='Overperforming Slices'
        />
        <p><strong>Select Features:</strong></p>
        <FormGroup style={{ marginLeft: '1rem' }}>
          {featuresData.features.sort().map((feature) => {
            return <FormControlLabel
              control={<Checkbox defaultChecked checked={features.includes(feature)} />}
              label={feature}
              key={feature}
              onChange={(event) => handleCheckboxChange(event, feature)}
            />
          })}
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
