import React, {useState} from 'react'
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

function ToppingCheckBox({topping, finalToppings, isPreSelected=false}) {
  const [isChecked, setIsChecked] = useState(isPreSelected)

  //add the updated topping state for form here and set to ispreselected
  // pass down setter/getter and use inside handleChange
  
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