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
import ColorLegend from './ColorLegend'

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
  nodeSize,
  setNodeSize,
  nodeColor,
  setNodeColor,
  show,
  setShow,
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

  const handleShowChange = (event) => {
    setShow(event.target.value);
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
    setEdgeFiltering(500);
    setEdgeForce(1);
    setShowConvexHull(false);
    setNodeSize('size')
    setNodeColor('loss')
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
        <div style={{margin: '2rem 0', lineHeight: '0.5rem'}}>
          <h1>Slice Settings</h1>
          {view !== 'bar' ? (<h2>Each slice is a node</h2>) : (<h2>Each slice is a bar</h2>)}
        </div>
        {view === 'bar' ? (
          <>
            <p><strong>Sort By:</strong></p>
            <FormControl sx={{ m: 0, minWidth: 175 }} size="small">
              <Select
                value={sortBy}
                onChange={handleSortByChange}
              >
                <MenuItem value={'loss'}>Log Loss</MenuItem>
                <MenuItem value={'accuracy'}>Balanced Accuracy</MenuItem>
                <MenuItem value={'size'}>Sample Size</MenuItem>
              </Select>
            </FormControl>
            <p><strong>Color Represents</strong></p>
            <FormControl sx={{ s: 1, minWidth: 175 }} size="small">
              <Select
                value={nodeColor}
                onChange={(event) => {
                  setNodeColor(event.target.value);
                  setShowConvexHull(false);
                }}
              >
                <MenuItem value={'loss'}>Log Loss</MenuItem>
                <MenuItem value={'accuracy'}>Balanced Accuracy</MenuItem>
              </Select>
            </FormControl>
            <ColorLegend overperforming={overperforming} nodeColor={nodeColor}/>
          </>
        ) : (
            <>
              <p><strong>Size Represents</strong></p>
              <FormControl sx={{ s: 1, minWidth: 175 }} size="small">
                <Select
                  value={nodeSize}
                  onChange={(event) => {
                    setNodeSize(event.target.value);
                    setShowConvexHull(false);
                  }}
                >
                  <MenuItem value={'size'}>Slice Sample Size</MenuItem>
                  <MenuItem value={'accuracy'}>Balanced Accuracy</MenuItem>
                </Select>
              </FormControl>
              <p><strong>Color Represents</strong></p>
              <FormControl sx={{ s: 1, minWidth: 175 }} size="small">
                <Select
                  value={nodeColor}
                  onChange={(event) => {
                    setNodeColor(event.target.value);
                    setShowConvexHull(false);
                  }}
                >
                  <MenuItem value={'loss'}>Log Loss</MenuItem>
                  <MenuItem value={'accuracy'}>Balanced Accuracy</MenuItem>
                </Select>
              </FormControl>
              <ColorLegend overperforming={overperforming} nodeColor={nodeColor}/>
              <Divider style={{ padding: '1rem' }} />
              <p><strong>Show top {show} slices</strong></p>
              <Box sx={{width: '10rem', margin: '1rem'}}>
                <Slider
                  size='small'
                  defaultValue={100}
                  aria-label='Small'
                  value={show}
                  valueLabelDisplay='auto'
                  min={10}
                  max={100}
                  step={10}
                  onChange={handleShowChange}
                />
              </Box>
              <p><strong>sorted by</strong></p>
              <FormControl sx={{ s: 1, minWidth: 175 }} size="small">
                <Select
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    setShowConvexHull(false);
                  }}
                >
                  <MenuItem value={'loss'}>Log Loss</MenuItem>
                  <MenuItem value={'accuracy'}>Balanced Accuracy</MenuItem>
                  <MenuItem value={'size'}>Sample Size</MenuItem>
                </Select>
              </FormControl>
              <Divider style={{ padding: '1rem' }} />
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{width: '75%'}}>
                  <p><strong>Convex Hull:</strong></p>
                </div>
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
              </div>
            </>
        )}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{width: '75%'}}>
            <p><strong>Overperforming:</strong></p>
          </div>
          <Switch
            checked={overperforming}
            onChange={handleSwitchChange}
            label='Overperforming Slices'
            />
        </div>
        {view === 'graph' && (
          <div style={{lineHeight: '0.5'}}>
            <p><strong>Edge Filtering:</strong></p>
            <Box sx={{width: '10rem', margin: '0 1rem'}}>
              <Slider
                aria-label='Edge Filtering'
                value={edgeFiltering}
                valueLabelDisplay='auto'
                defaultValue={500}
                step={100}
                min={0}
                max={2000}
                size='small'
                onChange={(event) => {
                  setEdgeFiltering(event.target.value);
                  setShowConvexHull(false);
                }}
                />
            </Box>
            <p><strong>Edge Force Strength:</strong></p>
            <Box sx={{width: '10rem', margin: '0 1rem'}}>
`            <Slider
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
              />`
            </Box>
          </div>
        )}
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
        <p><strong>Features:</strong></p>
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
