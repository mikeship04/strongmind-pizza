import React from 'react'
import { useState, useEffect } from 'react'
import Pizza from './Pizza'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Container, Box } from '@mui/system'
import NewPizzaform from './NewPizzaform'

function Chefs({topping}) {
  const [newPizza, setNewPizza] = useState('')
  const [editToppings, setEditToppings] = useState([])
  const [errors, setErrors] = useState([])
  let navigate = useNavigate()
  const [pizza, setPizza] = useState()

  useEffect(() => {
    fetch("/pizzas")
    .then((res) => res.json())
    .then((data) => setPizza(data))
  }, [])

  function handleNewPizza(e){
    setNewPizza(e.target.value)
  }

  const pizzaObject = {
    name: `${newPizza}`,
    toppings: [editToppings]
  }

  function handleAddPizza(e){
    e.preventDefault()
    fetch(`/pizzas`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(pizzaObject)
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => setPizza([...pizza, res]))
      } else {
        response.json().then((errorData) => setErrors(errorData.errors))
      }
    })
    setEditToppings([])
    e.target.reset()
  }
  
  function deletePizza(id){
    const deletedPizza = pizza.filter((p) => {
      if (p.id === id) {
        return false
      } else {
        return true
      }
    })
    setPizza(deletedPizza)
  }

  function updatePizza(data){
    const updatedPizza = pizza.filter(p => p.id !== data.id)
    setPizza([...updatedPizza, data])
  }

  function finalToppings(id){
    const idx = editToppings.indexOf(id)
    if (editToppings.includes(id)){
        editToppings.splice(idx, 1)
    } else{
      setEditToppings([...editToppings, id])
    }
  }

  const renderPizza = (pizza) => pizza?.map(p => {
    return <Pizza
    key={p.id}
    pizza={p}
    updatePizza={updatePizza}
    deletePizza={deletePizza}
    topping={topping}
    editToppings={editToppings}
    setEditToppings={setEditToppings}
    finalToppings={finalToppings}
    />
  })

  return (
    <>
    <Button 
    variant="contained" 
    style={{marginTop: "20px", marginLeft: "30px"}} 
    onClick={() => navigate(-1)}>StrongMind Pizza Home</Button>
    <div>
      <h1>Pizza Chefs!</h1>
        <p>Click on a pizza to manage or remove!</p>
        <NewPizzaform 
        topping={topping} 
        newPizza={newPizza} 
        errors={errors} 
        handleAddPizza={handleAddPizza} 
        handleNewPizza={handleNewPizza}
        final={finalToppings}/>
    </div>
    <Container sx={{height: 1000, width: 1100}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm:2, md: 3 }}>
          {renderPizza(pizza)}
        </Grid>
      </Box>
    </Container>
    </>
  )
}

export default Chefs