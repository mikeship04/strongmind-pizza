import './App.css';
import { useState, useEffect } from "react";
import Pizza from './components/Pizza';
import Topping from './components/Topping';

function App() {
    const [count, setCount] = useState(0);
    const [pizza, setPizza] = useState()
    const [topping, setTopping] = useState()

    useEffect(() => {
      fetch("/hello")
        .then((r) => r.json())
        .then((data) => setCount(data.count));
    }, []);

    useEffect(() => {
      fetch("/pizzas")
      .then((res) => res.json())
      .then((data) => setPizza(data))
    }, [])

    useEffect(() => {
      fetch("/toppings")
      .then((res) => res.json())
      .then((data) => setTopping(data))
    }, [])

    const renderPizza = pizza?.map(p => {
      return <Pizza
      key={p.id}
      pizza={p}
      />
    })

    const renderToppings = topping?.map(t => {
      return <Topping
      key={t.id}
      topping={t}
      />
    })

    return (
      <div className="App">
        <h1>Page Count: {count}</h1>
        <h1>{renderPizza}</h1>
        <h1>{renderToppings}</h1>
      </div>
    );
  }

export default App;
