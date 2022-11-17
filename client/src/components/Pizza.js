import React, {useState} from 'react'
import PizzaToppings from './PizzaToppings'
import ToppingCheckBox from './ToppingCheckBox'
import Grid from '@mui/material/Grid'
import { 
  Card, 
  CardContent, 
  CardActionArea, 
  Typography,
  Modal,
  Box,
  Button,
  TextField,
  } from '@mui/material'
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Pizza({
  pizza, 
  deletePizza, 
  updatePizza, 
  topping, 
  finalToppings, 
  editToppings, 
  setEditToppings}) {
  const [editPizza, setEditPizza] = useState(pizza.name)
  const [errors, setErrors] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
  setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setEditPizza(pizza.name)
    setEditToppings('')
  }

  const renderToppings = pizza?.toppings?.map((t) => {
    return <PizzaToppings key={t.id} toppings={t}/>
  })

  function handleDelete() {
    fetch(`pizzas/${pizza.id}`, {
      method: 'DELETE',
    })
    .then(deletePizza(pizza.id))
  }

  const pizzaIds = pizza.toppings.map((topping) => {
    return topping.id
  })

  const [newToppingArray, setNewToppingArray] = useState([...pizzaIds, ...editToppings])

  function setUpdateToppings(id){
    const numId = parseInt(id)
    const idx = newToppingArray.indexOf(numId)
    if (newToppingArray.includes(numId)){
        newToppingArray.splice(idx, 1)
    } else{
      setNewToppingArray([...newToppingArray, numId])
    }
  }

  const pizzaObject = {
    name: `${editPizza}`,
    toppings: [newToppingArray]
  }  

  function handleUpdatePizza(e){
    e.preventDefault()
    fetch(`pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pizzaObject)
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => updatePizza(res))
      } else {
        response.json().then((errorData) => setErrors(errorData.errors))
      }
    })
    handleClose()
  }

  function handleEditPizza(e){
    setEditPizza(e.target.value)
  }

  const renderAvailabletoppings = topping?.map((t) => {
    return <ToppingCheckBox 
    finalToppings={finalToppings}
    setUpdateToppings={setUpdateToppings}
    key={t.id} 
    topping={t}
    isPreSelected={pizza?.toppings?.filter((top) => top.id === t.id).length > 0}/>
  })

  return (
    <>
    <Grid
    item xs={12} sm={6} md={3}
    >
      <Card 
      onClick={handleOpen}
      sx={{ maxWidth: 250, ':hover': {boxShadow: 20, }}}>
      <CardActionArea>
          <CardContent>
            <Typography sx={{ fontFamily: 'Monospace', fontWeight: 'bold', m:1 }} variant="h4">{pizza.name}</Typography>
              <Typography sx={{ fontFamily: 'Monospace' }}variant="subtitle2">{renderToppings}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
      open={open}
      onClose={handleClose}
      >
        <Box sx={style}>
        <form onSubmit={handleUpdatePizza}>
          <TextField
          margin="normal"
          id="name"
          label={pizza.name}
          placeholder={pizza.name}
          value={editPizza}
          onChange={handleEditPizza}
          />
          {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <h4 key={error}>{error}</h4>
              ))}
            </ul>
          )}
        <Button style={{marginTop: "30px", marginLeft: "10px"}} variant="contained" type="submit">Save</Button>
        <Button style={{marginTop: "30px", marginLeft: "10px"}} onClick={handleDelete} variant="contained">Delete</Button>
        <Button onClick={handleClose}>x</Button>
        {renderAvailabletoppings}
        </form>
        </Box>
      </Modal>
    </Grid>
    </>
  )
}

export default Pizza