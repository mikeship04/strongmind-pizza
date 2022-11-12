import React from 'react'
import { useState, useEffect } from 'react'
import Pizza from './Pizza'

function Chefs() {
  const [pizza, setPizza] = useState()

  useEffect(() => {
    fetch("/pizzas")
    .then((res) => res.json())
    .then((data) => setPizza(data))
  }, [])

  const renderPizza = pizza?.map(p => {
    return <Pizza
    key={p.id}
    pizza={p}
    />
  })

  return (
    <div>Chefs
    <h1>{renderPizza}</h1>
    </div>
  )
}

export default Chefs