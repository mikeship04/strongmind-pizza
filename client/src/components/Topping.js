import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Card, 
  CardContent, 
  Typography, 
  Modal, 
  Box, 
  TextField, 
  Button, 
  CardActionArea,
  IconButton} from '@mui/material'
  import { Delete } from '@mui/icons-material';

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

function Topping({topping, deleteTopping, updateTopping}) {
  const [open, setOpen] = useState(false)
  const [editTopping, setEditTopping] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false) 
    setEditTopping('')
  }

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
    .then(data => {
      updateTopping(data)
    })
    handleClose()
  }

  function handleDelete() {
    let isExecuted = window.confirm("This topping is in use, are you sure?")
    if(isExecuted){
      fetch(`toppings/${topping.id}`, {
          method: 'DELETE',
      })
      .then(deleteTopping(topping.id))
    } else {
      console.log('nothing happened')
    }
}

  function handleEditTopping(e){
    setEditTopping(e.target.value)
  }

  return (
    <Grid item xs={2}>
      <Card
      onClick={handleOpen}
      sx={{':hover': {boxShadow: 20, }}}
      >
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{topping.name}</Typography>
          </CardContent>
        </CardActionArea>
        <IconButton onClick={handleDelete} aria-label="delete">
              <Delete />
            </IconButton>
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
          onChange={handleEditTopping}
          />
        <Button style={{marginTop: "30px", marginLeft: "10px"}} variant="contained" type="submit">Save Changes</Button>
        </form>
      </Box>
      </Modal>
    </Grid>
  )
}

export default Topping