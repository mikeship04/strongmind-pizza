import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/system'
import Pizza from './Pizza'
import NewPizzaform from './NewPizzaform'
import { SettingsApplicationsRounded } from '@mui/icons-material'

function Chefs({topping}) {
  const [newPizza, setNewPizza] = useState('')
  const [editToppings, setEditToppings] = useState([])
  const [errors, setErrors] = useState([])
  const [pizza, setPizza] = useState()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const  rootStyle = { marginTop: '70px' }
  let navigate = useNavigate()
  
  const pizzaObject = {
    name: `${newPizza}`,
    toppings: [editToppings]
  }

  useEffect(() => {
    fetch("/pizzas")
    .then((res) => res.json())
    .then((data) => setPizza(data))
  }, [])

  function handleNewPizza(e){
    setNewPizza(e.target.value)
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
    handleClose()
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
    <div>
      <Button 
      variant="contained" 
      style={{marginTop: "20px", marginLeft: "30px"}} 
      onClick={() => navigate(-1)}>StrongMind Pizza Home</Button>
        <h1>Pizza Chefs!</h1>
          <p>Click on a pizza to manage or remove!</p>
          <NewPizzaform
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open} 
          topping={topping} 
          newPizza={newPizza} 
          errors={errors} 
          handleAddPizza={handleAddPizza} 
          handleNewPizza={handleNewPizza}
          final={finalToppings}/>
    </div>
    <Container style={rootStyle}>
        <Grid 
        container 
        spacing={3}>
          {renderPizza(pizza)}
        </Grid>
    </Container>
    </>
  )
}

export default Chefs