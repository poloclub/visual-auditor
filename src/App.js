import React from 'react';
import Nav from './components/Nav/Nav';
import LeftDrawer from './components/LeftDrawer/LeftDrawer';
import RightDrawer from './components/RightDrawer/RightDrawer';
import Main from './components/Main/Main';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function App() {
  const [algorithm, setAlgorithm] = React.useState('slicefinder');
  const [numFeatures, setNumFeatures] = React.useState(2);
  const [sampleSize, setSampleSize] = React.useState(0);
  const [metric, setMetric] = React.useState('Log Loss');
  const [view, setView] = React.useState('bar');
  const [sortBy, setSortBy] = React.useState('metric');
  const [overperforming, setOverperforming] = React.useState(false);
  const [radius, setRadius] = React.useState('log');
  const [edgeFiltering, setEdgeFiltering] = React.useState(100);
  const [edgeThickness, setEdgeThickness] = React.useState(1);
  const [edgeForce, setEdgeForce] = React.useState(1);
  const [cursorMode, setCursorMode] = React.useState('drag');
  const [features, setFeatures] = React.useState([
    'Age',
    'Workclass',
    'Education',
    'Education-Num',
    'Marital Status',
    'Occupation',
    'Relationship',
    'Race',
    'Sex',
    'Capital Gain',
    'Capital Loss',
    'Hours Per Week',
    'Country',
  ]);
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
        showConvexHull={showConvexHull}
        setShowConvexHull={setShowConvexHull}
      />
      <RightDrawer
        details={details}
        metric={metric}
        overperforming={overperforming}
        view={view}
        convexHull={showConvexHull}
      />
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
        algorithm={algorithm}
        setShowConvexHull={setShowConvexHull}
      />
    </div>
  );
}

export default App;
