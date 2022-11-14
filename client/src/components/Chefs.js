import React from 'react'
import { useState } from 'react'
import Pizza from './Pizza'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Container, Box } from '@mui/system'

function Chefs({topping, pizza, setPizza}) {
  const [newPizza, setNewPizza] = useState('')
  const [editToppings, setEditToppings] = useState([])
  const [errors, setErrors] = useState([])
  let navigate = useNavigate()

  function handleNewPizza(e){
    setNewPizza(e.target.value)
  }

  function handleAddPizza(e){
    e.preventDefault()
    fetch(`/pizzas`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: `${newPizza}`, toppings: []})
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => setPizza([...pizza, res]))
      } else {
        response.json().then((errorData) => setErrors(errorData.errors))
      }
    })
    .then(setNewPizza(''))
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
    final={finalToppings}
    />
  })

  return (
    <>
    <Button 
    variant="contained" 
    style={{marginTop: "20px", marginLeft: "30px"}} 
    onClick={() => navigate(-1)}>Back</Button>
    <div>
      <h1>Pizza Chefs!</h1>
        <p>Click on a pizza to manage!</p>
        <form onSubmit={handleAddPizza}>
        <TextField
          margin="normal"
          id="newTopping"
          required
          value={newPizza.name} 
          onChange={handleNewPizza}
          >
        </TextField>
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <h4 key={error}>{error}</h4>
              ))}
            </ul>
          )}
        <Button style={{marginTop: "30px", marginLeft: "10px"}} variant="contained" type="Submit">Submit</Button>
      </form>
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