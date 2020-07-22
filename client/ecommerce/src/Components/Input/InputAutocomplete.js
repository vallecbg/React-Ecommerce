import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
const InputAutocomplete = ({ label, name, changeHandler, formState, runControlValidation, options }) => {
  return (
    <Autocomplete
      id={name}
      options={options}
      getOptionLabel={(option) => option.title}
      fullWidth
      onChange={changeHandler}
      onBlur={runControlValidation(name)}
      // error={!!formState.errors && !!formState.errors[name]}
      // helperText={formState.errors && formState.errors[name]}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" 
      error={!!formState.errors && !!formState.errors[name]}
      helperText={formState.errors && formState.errors[name]} />}
    />
  );
};

export default InputAutocomplete;