import './App.css';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import StoreOwner from './components/StoreOwner';
import Chefs from './components/Chefs';
import { useEffect, useState } from 'react';

function App() {
  const [toppingsArray, setToppingsArray] = useState()
  const [pizzasArray, setPizzasArray] = useState()

  useEffect(() => {
    fetch("/toppings")
    .then((res) => res.json())
    .then((data) => setToppingsArray(data))
  }, [])

  useEffect(() => {
    fetch("/pizzas")
    .then((res) => res.json())
    .then((data) => setPizzasArray(data))
  }, [])

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/storeOwner" element={<StoreOwner toppingsArray={toppingsArray} setToppingsArray={setToppingsArray}/>} />
          <Route path="/chefs" element={<Chefs topping={toppingsArray} pizza={pizzasArray} setPizza={setPizzasArray}/>} />
        </Routes>
      </div>
    );
  }

export default App;
