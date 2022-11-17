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
      <h1>Welcome to Strongmind Pizza Editor!</h1>
      <img width="50% vw" height ="60% vh" src="https://iniziopizza.com/wp-content/uploads/1-1-of-1-2-2048x1174.jpg" alt="some delicious looking pizzas"></img>
    <div>
    </div>
    </>
  )
}

export default LandingPage