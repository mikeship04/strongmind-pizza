import './App.css';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import StoreOwner from './components/StoreOwner';
import Chefs from './components/Chefs';
import { useEffect, useState } from 'react';

function App() {
  const [topping, setTopping] = useState()

  useEffect(() => {
    fetch("/toppings")
    .then((res) => res.json())
    .then((data) => setTopping(data))
  }, [])

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/storeOwner" element={<StoreOwner topping={topping} setTopping={setTopping}/>} />
          <Route path="/chefs" element={<Chefs topping={topping}/>} />
        </Routes>
      </div>
    );
  }

export default App;
