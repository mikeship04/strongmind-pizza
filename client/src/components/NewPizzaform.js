import React, { useState} from 'react'
import { Button, TextField, Modal, Box } from '@mui/material'
import ToppingCheckBox from './ToppingCheckBox'

function NewPizzaform({errors, handleAddPizza, handleNewPizza, newPizza, topping, final}) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
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

  const renderAvailabletoppings = topping?.map((t) => {
    return <ToppingCheckBox finalToppings={final} key={t.id} topping={t}/>
  })

  return (
    <>
    <Button 
    style={{marginTop: "15px", marginBottom: "15px"}} 
    variant="contained" 
    onClick={handleOpen}
    required 
    >add new pizza!</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
    <form onSubmit={handleAddPizza}>
        <TextField
          margin="normal"
          id="newPizza"
          label="enter new pizza"
          placeholder="enter new pizza"
          required
          value={newPizza.name} 
          onChange={handleNewPizza}
          >
        </TextField>
        <Button style={{marginTop: "30px", marginLeft: "10px"}} variant="contained" type="Submit">Add Pizza!</Button>
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <h4 key={error}>{error}</h4>
              ))}
            </ul>
          )}
          {renderAvailabletoppings}
      </form>
      </Box>
      </Modal>
    </>
  )
}

export default NewPizzaform