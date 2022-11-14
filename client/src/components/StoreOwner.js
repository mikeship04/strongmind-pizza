import { Box, Grid, TextField, Button } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topping from './Topping'

const  rootStyle = { marginTop: '70px' }
function StoreOwner({topping, setTopping}) {
  const navigate = useNavigate()
  const [newTopping, setNewTopping] = useState('')
  const [errors, setErrors] = useState([])
  
  function handleNewTopping(e){
    setNewTopping(e.target.value)
  }
  
  function handleAddToppings(e){
    e.preventDefault()
    fetch(`/toppings`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: `${newTopping}`})
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => setTopping([...topping, res]))
      } else {
        response.json().then((errorData) => setErrors(errorData.errors))
      }
    })
    setNewTopping('')
  }
  
  function deleteTopping(id) {
    const deletedTopping = topping.filter((t) => {
      if (t.id === id) {
        return false
      } else {
        return true
      }
    })
    setTopping(deletedTopping)
  }

  function updateTopping(data){
    const updatedToppings = topping.filter(t => t.id !== data.id)
    setTopping([...updatedToppings, data])
  }
  
  const renderToppings = (topping) => topping?.map(t => {
    return <Topping
    key={t.id}
    topping={t}
    deleteTopping={deleteTopping}
    updateTopping={updateTopping}
    />
  })
  
  return (
    <>
    <Button variant="contained" style={{marginTop: "20px", marginLeft: "30px"}} onClick={() => navigate(-1)}>Back</Button>
    <div>
      <h1>Store owners</h1>
      <p>Click on a topping to manage!</p>
      <form onSubmit={handleAddToppings}>
        <TextField
          margin="normal"
          id="newTopping"
          required
          value={newTopping.name} 
          onChange={handleNewTopping}
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
    <Container style={rootStyle} sx={{height: 1000, width: 1100}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm:2, md: 3 }}>
          {renderToppings(topping)}
        </Grid>
      </Box>
    </Container>
    </>
  )
}

export default StoreOwner