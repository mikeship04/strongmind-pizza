import React from 'react'
import { useState, useEffect } from 'react'
import Pizza from './Pizza'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Container, Box } from '@mui/system'

function Chefs({topping}) {
  const [pizza, setPizza] = useState()
  const [newPizza, setNewPizza] = useState('')
  let navigate = useNavigate()

  function handleNewPizza(e){
    setNewPizza(e.target.value)
  }

  function handleAddPizza(e){
    e.preventDefault()
    fetch(`/pizzas`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: `${newPizza}`})
    })
    .then(response => {return response.json()})
    .then((res) => {
      setPizza([...pizza, res])
    })
    .then(setNewPizza(''))
  }

  useEffect(() => {
    fetch("/pizzas")
    .then((res) => res.json())
    .then((data) => setPizza(data))
  }, [])
  
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
    const updatedPizza = pizza.filter((p) => {
      if (p.id === data.id) {
        return data
      } else {
        return p
      }
    })
    setPizza(updatedPizza)
  }
  // add multi select for ingredients, show all available ingredients

  const renderPizza = (pizza) => pizza?.map(p => {
    return <Pizza
    key={p.id}
    pizza={p}
    updatePizza={updatePizza}
    deletePizza={deletePizza}
    topping={topping}
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