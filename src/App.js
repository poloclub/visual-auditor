import React from 'react';
import Nav from './components/Nav/Nav';
import LeftDrawer from './components/LeftDrawer/LeftDrawer';
import RightDrawer from './components/RightDrawer/RightDrawer';
import Main from './components/Main/Main';

function App() {
  const [numFeatures, setNumFeatures] = React.useState(1);
  const [sampleSize, setSampleSize] = React.useState(0);
  const [metric, setMetric] = React.useState('accuracy');

  return (
    <div className='App'>
      <Nav />
      <LeftDrawer
        numFeatures={numFeatures}
        setNumFeatures={setNumFeatures}
        sampleSize={sampleSize}
        setSampleSize={setSampleSize}
        metric={metric}
        setMetric={setMetric}
      />
      <RightDrawer />
      <Main numFeatures={numFeatures} sampleSize={sampleSize} metric={metric} />
    </div>
  );
}

export default App;
