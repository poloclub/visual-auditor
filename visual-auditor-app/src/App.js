import React from 'react';
import Nav from './components/Nav/Nav';
import LeftDrawer from './components/LeftDrawer/LeftDrawer';
import RightDrawer from './components/RightDrawer/RightDrawer';
import Main from './components/Main/Main';
import featuresData from './data/features.json'

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function App() {
  const [algorithm, setAlgorithm] = React.useState('slicefinder');
  const [numFeatures, setNumFeatures] = React.useState(2);
  const [sampleSize, setSampleSize] = React.useState(0);
  const [metric, setMetric] = React.useState('Log Loss');
  const [view, setView] = React.useState('force');
  const [sortBy, setSortBy] = React.useState('loss');
  const [overperforming, setOverperforming] = React.useState(false);
  const [radius, setRadius] = React.useState('log');
  const [edgeFiltering, setEdgeFiltering] = React.useState(500);
  const [edgeThickness, setEdgeThickness] = React.useState(1);
  const [edgeForce, setEdgeForce] = React.useState(1);
  const [cursorMode, setCursorMode] = React.useState('select');
  const [show, setShow] = React.useState(100);
  const [nodeSize, setNodeSize] = React.useState('size')
  const [nodeColor, setNodeColor] = React.useState('loss')
  const [features, setFeatures] = React.useState(featuresData.features);
  const [details, setDetails] = React.useState(null);
  const setDetailsCallback = React.useCallback((details) => {
    setDetails(details);
  }, []);
  const [showConvexHull, setShowConvexHull] = React.useState(false);

  return (
    <div className='App'>
      <Nav
        view={view}
        setView={setView}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
      <LeftDrawer
        numFeatures={numFeatures}
        setNumFeatures={setNumFeatures}
        sampleSize={sampleSize}
        setSampleSize={setSampleSize}
        metric={metric}
        setMetric={setMetric}
        sortBy={sortBy}
        setSortBy={setSortBy}
        overperforming={overperforming}
        setOverperforming={setOverperforming}
        features={features}
        setFeatures={setFeatures}
        view={view}
        radius={radius}
        setRadius={setRadius}
        edgeFiltering={edgeFiltering}
        setEdgeFiltering={setEdgeFiltering}
        edgeForce={edgeForce}
        setEdgeForce={setEdgeForce}
        cursorMode={cursorMode}
        setCursorMode={setCursorMode}
        show={show}
        setShow={setShow}
        nodeSize={nodeSize}
        setNodeSize={setNodeSize}
        nodeColor={nodeColor}
        setNodeColor={setNodeColor}
        showConvexHull={showConvexHull}
        setShowConvexHull={setShowConvexHull}
      />
      {/* <RightDrawer
        details={details}
        metric={metric}
        overperforming={overperforming}
        view={view}
        convexHull={showConvexHull}
      /> */}
      <Main
        numFeatures={numFeatures}
        sampleSize={sampleSize}
        metric={metric}
        view={view}
        sortBy={sortBy}
        overperforming={overperforming}
        features={features}
        radius={radius}
        edgeFiltering={edgeFiltering}
        edgeForce={edgeForce}
        setDetails={setDetailsCallback}
        cursorMode={cursorMode}
        show={show}
        algorithm={algorithm}
        setShowConvexHull={setShowConvexHull}
        nodeSize={nodeSize}
        nodeColor={nodeColor}
      />
    </div>
  );
}

export default App;
