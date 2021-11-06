import React from 'react';
import Nav from './components/Nav/Nav';
import LeftDrawer from './components/LeftDrawer/LeftDrawer';
import RightDrawer from './components/RightDrawer/RightDrawer';
import Main from './components/Main/Main';

function App() {
  const [numFeatures, setNumFeatures] = React.useState(2);
  const [sampleSize, setSampleSize] = React.useState(0);
  const [metric, setMetric] = React.useState('Log Loss');
  const [view, setView] = React.useState('bar');
  const [sortBy, setSortBy] = React.useState('metric');
  const [overperforming, setOverperforming] = React.useState(false);
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

  return (
    <div className='App'>
      <Nav view={view} setView={setView} />
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
      />
      <RightDrawer />
      <Main
        numFeatures={numFeatures}
        sampleSize={sampleSize}
        metric={metric}
        view={view}
        sortBy={sortBy}
        overperforming={overperforming}
        features={features}
      />
    </div>
  );
}

export default App;
