import { Box, Grid, TextField, Button } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topping from './Topping'


const  rootStyle = { marginTop: '70px' }
function StoreOwner() {
  const navigate = useNavigate()
  const [topping, setTopping] = useState()
  const [newTopping, setNewTopping] = useState('')

  useEffect(() => {
    fetch("/toppings")
    .then((res) => res.json())
    .then((data) => setTopping(data))
  }, [])
  
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
    .then(response => {return response.json()})
    .then((res) => {
      const toppings = topping
      toppings.push(res)
      setTopping(toppings)
      console.log('lol')
    })
    //not working
    .then(setNewTopping(''))
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
    const updatedToppings = topping.filter((t) => {
      // t.id === data.id
      if (t.id === data.id) {
        return data
      } else {
        return t
      }
    })
    setTopping(updatedToppings)
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