import React, {useState} from 'react'
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

function ToppingCheckBox({topping, finalToppings, pizza}) {
  const [isChecked, setIsChecked] = useState(false)
  
  const handleChange = (e) => {
    setIsChecked(!isChecked)
    finalToppings(e.target.value)
  }

  return (
    <FormGroup>
      <FormControlLabel 
      control={<Checkbox 
      checked={isChecked} 
      onChange={handleChange} />} 
      value={topping.id} 
      label={topping.name} />
    </FormGroup>
  );
}

export default ToppingCheckBox