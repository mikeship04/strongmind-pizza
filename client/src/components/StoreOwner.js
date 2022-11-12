import { Box, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useEffect, useState } from 'react'
import Topping from './Topping'


const  rootStyle = { marginTop: '70px' }
function StoreOwner() {
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
    .then((res) => res.json())
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
  const renderToppings = topping?.map(t => {
    return <Topping
    key={t.id}
    topping={t}
    deleteTopping={deleteTopping}
    />
  })
  
  return (
    <>
    <div>
      <h1>Store owners</h1>
      <p>Click on a topping to manage!</p>
      <form onSubmit={handleAddToppings}>
        <label>
          Add toppings:
          <textarea value={newTopping.name} onChange={handleNewTopping} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    <Container style={rootStyle} sx={{height: 1000, width: 1100}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {renderToppings}
        </Grid>
      </Box>
    </Container>
    </>
  )
}

export default StoreOwner