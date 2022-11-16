import React, {useState} from 'react'
import PizzaToppings from './PizzaToppings'
import ToppingCheckBox from './ToppingCheckBox'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
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

function Pizza({pizza, deletePizza, updatePizza, topping, finalToppings, editToppings, setEditToppings}) {
  const [editPizza, setEditPizza] = useState(pizza.name)
  const [errors, setErrors] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
  setOpen(true)
  // const zaIds = pizza.toppings.map((topping) => {
  //   return topping.id
  // })
  // setEditToppings(zaIds)
  }
  const handleClose = () => {
    setOpen(false)
    setEditPizza('')
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

  // const pizzaIds = pizza.toppings.map((topping) => {
  //   return topping.id
  // })

  //newarray is pizzaids + edit toppings
  // pizzaIDS = its own state, and update with Topping checkbox setter
  const pizzaObject = {
    name: `${editPizza}`,
    // toppings: [...pizzaIds]
  }  
  // console.log(pizzaObject)

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
    key={t.id} 
    topping={t}
    isPreSelected={pizza?.toppings?.filter((top) => top.id === t.id).length > 0}/>
  })

  return (
    <>
    <Grid
    sx={{ ':hover': {boxShadow: 20, }}}
    >
      <Card 
      onClick={handleOpen}
      sx={{ maxWidth: 250}}>
      <CardActionArea>
          <CardContent>
            <Typography variant="h5">{pizza.name}</Typography>
              <Typography variant="h6">{renderToppings}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleUpdatePizza}>
          <TextField
          margin="normal"
          required
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
        <Button style={{marginTop: "30px", marginLeft: "10px"}} variant="contained" type="submit">Edit Pizza</Button>
        <Button style={{marginTop: "30px", marginLeft: "10px"}} onClick={handleDelete} variant="contained">Delete</Button>
        {renderAvailabletoppings}
        </form>
        </Box>
      </Modal>
    </Grid>
    </>
  )
}

export default Pizza