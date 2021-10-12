import Nav from './components/Nav/Nav';
import LeftDrawer from './components/LeftDrawer/LeftDrawer';
import RightDrawer from './components/RightDrawer/RightDrawer';
import Main from './components/Main/Main';

function App() {
  return (
    <div className='App'>
      <Nav />
      <LeftDrawer />
      <RightDrawer />
      <Main />
    </div>
  );
}

export default App;
