import React, {useState} from 'react'
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

function ToppingCheckBox({topping, finalToppings, isPreSelected=false}) {
  const [isChecked, setIsChecked] = useState(isPreSelected)

  //if isChecked is true finalToppings(e.target.value) finalToppings('')
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