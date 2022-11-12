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
    <div>LandingPage
    <button onClick={handleStore}>Store Owners!</button>
    <button onClick={handleChef}>Pizza Chefs!</button>
    </div>
  )
}

export default LandingPage