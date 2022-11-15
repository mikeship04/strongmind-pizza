import { Box, Grid, TextField, Button } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topping from './Topping'

const  rootStyle = { marginTop: '70px' }
function StoreOwner({toppingsArray, setToppingsArray}) {
  const navigate = useNavigate()
  const [newTopping, setNewTopping] = useState('')
  const [errors, setErrors] = useState([])
  
  function handleSetNewTopping(e){
    setNewTopping(e.target.value)
  }
  
  function handleAddNewTopping(e){
    e.preventDefault()
    fetch(`/toppings`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: `${newTopping}`})
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => setToppingsArray([...toppingsArray, res]))
      } else {
        response.json().then((errorData) => setErrors(errorData.errors))
      }
    })
    setNewTopping('')
  }
  
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

  function updateTopping(data){
    const updatedToppings = toppingsArray.filter(t => t.id !== data.id)
    setToppingsArray([...updatedToppings, data])
  }
  
  const renderToppings = (toppingsArray) => toppingsArray?.map(topping => {
    return <Topping
    key={topping.id}
    topping={topping}
    deleteTopping={deleteTopping}
    updateTopping={updateTopping}
    />
  })
  
  return (
    <>
    <Button 
    variant="contained" 
    style={{marginTop: "20px", marginLeft: "30px"}} 
    onClick={() => navigate(-1)}>Back</Button>
    <div>
      <h1>Store owners</h1>
      <p>Click on a topping to manage!</p>
      <form onSubmit={handleAddNewTopping}>
        <TextField
          margin="normal"
          id="newTopping"
          required
          value={newTopping.name} 
          onChange={handleSetNewTopping}
          >
        </TextField>
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <h4 key={error}>{error}</h4>
              ))}
            </ul>
          )}
        <Button 
        style={{marginTop: "30px", marginLeft: "10px"}} 
        variant="contained" 
        type="Submit">Submit</Button>
      </form>
    </div>
    <Container style={rootStyle} sx={{height: 1000, width: 1100}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {renderToppings(toppingsArray)}
        </Grid>
      </Box>
    </Container>
    </>
  )
}

export default StoreOwner