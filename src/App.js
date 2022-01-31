import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Login from './pages/Login'
import Translation from './pages/Translation'
import Profile from './pages/Profile'
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/translation" element={ <Translation /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
