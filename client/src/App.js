import './App.css';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import StoreOwner from './components/StoreOwner';
import Chefs from './components/Chefs';
import { useEffect, useState } from 'react';

function App() {
  //change to plural pizzas/toppings
  const [topping, setTopping] = useState()
  const [pizza, setPizza] = useState()

  useEffect(() => {
    fetch("/toppings")
    .then((res) => res.json())
    .then((data) => setTopping(data))
  }, [])

  useEffect(() => {
    fetch("/pizzas")
    .then((res) => res.json())
    .then((data) => setPizza(data))
  }, [])

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/storeOwner" element={<StoreOwner topping={topping} setTopping={setTopping}/>} />
          <Route path="/chefs" element={<Chefs topping={topping} pizza={pizza} setPizza={setPizza}/>} />
        </Routes>
      </div>
    );
  }

export default App;
