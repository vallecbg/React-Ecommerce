import React from 'react';
import { Checkbox } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const InputCheckbox = ({ label, name, changeHandler, checked }) => {
  return (
    <FormControlLabel
    control={
        <Checkbox
            id={name}
            name={name} 
            checked={checked} 
            //value={checked}
            onChange={changeHandler} 
        />
    }
    label={label}
  />
    
  );
};

export default InputCheckbox;