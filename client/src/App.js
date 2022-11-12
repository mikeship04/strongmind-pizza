import './App.css';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import StoreOwner from './components/StoreOwner';
import Chefs from './components/Chefs';

function App() {

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/storeOwner" element={<StoreOwner/>} />
          <Route path="/chefs" element={<Chefs/>} />
        </Routes>
      </div>
    );
  }

export default App;
