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
    <div>
      <Button 
      onClick={handleStore} 
      variant="contained"
      style={{marginTop: "30px", marginLeft: "10px"}} 
      >Store Owners!</Button>
      <Button 
      onClick={handleChef} 
      variant="contained"
      style={{marginTop: "30px", marginLeft: "10px"}} 
      >Pizza Chefs!</Button>
    </div>
  )
}

export default LandingPage