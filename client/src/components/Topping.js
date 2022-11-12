import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Card, CardContent, Typography, Modal, Box, TextField, Button } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Topping({topping, deleteTopping}) {
  const [open, setOpen] = useState(false)
  const [editTopping, setEditTopping] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function handleUpdate(e){
    e.preventDefault()
    fetch(`toppings/${topping.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({name: `${editTopping}`})
    })
    .then(res => res.json())
    .then(console.log)
  }

  function handleDelete() {
    fetch(`toppings/${topping.id}`, {
        method: 'DELETE',
    })
    .then(deleteTopping(topping.id))
}

  function handleEeditTopping(e){
    setEditTopping(e.target.value)
  }

  
  return (
    <Grid item xs={2}>
      <Card
      onClick={handleOpen}
      sx={{ ':hover': {boxShadow: 20, }}}
      >
        <CardContent>
          <Typography>{topping.name}</Typography>
        </CardContent>
      </Card>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <form onSubmit={handleUpdate}>
        <TextField
        margin="normal"
        required
        id="name"
        label={topping.name}
        placeholder={topping.name}
        value={editTopping}
        onChange={handleEeditTopping}
        />
        <Button variant="contained" type="submit">Sumit</Button>
        <Button onClick={handleDelete} variant="contained">Delete</Button>
        </form>
      </Box>
      </Modal>
    </Grid>
  )
}

export default Topping