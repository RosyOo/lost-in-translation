import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Startup from './pages/Startup'
import Translation from './pages/Translation'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Startup />} />
          <Route path="/translation" element={ <Translation /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
