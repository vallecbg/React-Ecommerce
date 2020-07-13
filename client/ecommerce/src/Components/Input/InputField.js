import React from 'react';
import { TextField } from '@material-ui/core/';
const InputField = ({ label, name, changeHandler, formState, runControlValidation, type }) => {
  return (
    <TextField
      variant="outlined"
      required
      fullWidth
      autoFocus
      name={name}
      label={label}
      id={name}
      type={type === 'password' ? 'password' : 'text'}
      onChange={changeHandler}
      onBlur={runControlValidation(name)}
      error={!!formState.errors && !!formState.errors[name]}
      helperText={formState.errors && formState.errors[name]}
    />
  );
};

export default InputField;