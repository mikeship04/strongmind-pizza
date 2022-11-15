import './App.css';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import StoreOwner from './components/StoreOwner';
import Chefs from './components/Chefs';
import { useEffect, useState } from 'react';

function App() {
  const [toppingsArray, setToppingsArray] = useState()
  
  useEffect(() => {
    fetch("/toppings")
    .then((res) => res.json())
    .then((data) => setToppingsArray(data))
  }, [])

    function deleteTopping(id) {
      const deletedTopping = toppingsArray.filter((t) => {
        if (t.id === id) {
          return false
        } else {
          return true
        }
      })
      setToppingsArray(deletedTopping)
    }

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/storeOwner" element={<StoreOwner deleteTopping={deleteTopping} toppingsArray={toppingsArray} setToppingsArray={setToppingsArray}/>} />
          <Route path="/chefs" element={<Chefs topping={toppingsArray}/>} />
        </Routes>
      </div>
    );
  }

export default App;
