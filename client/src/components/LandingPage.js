import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  let navigate = useNavigate()

  function handleStore(){
    navigate("/storeOwner")
  }

  function handleChef(){
    navigate("/chefs")
  }
  
  return (
    <>
      <img width="800" height ="600" src="https://iniziopizza.com/wp-content/uploads/1-1-of-1-2-2048x1174.jpg" alt="some delicious looking pizzas"></img>
    <div>
      <p>Welcome to Strongmind_pizza Editor!</p>
      <Button 
      onClick={handleStore} 
      variant="contained"
      style={{marginTop: "30px"}} 
      >Store Owners!</Button>
      <Button 
      onClick={handleChef} 
      variant="contained"
      style={{marginTop: "30px", marginLeft: "10px"}} 
      >Pizza Chefs!</Button>
    </div>
    </>
  )
}

export default LandingPage