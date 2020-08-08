import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
const InputAutocomplete = ({ label, name, changeHandler, options }) => {
  return (
    <Autocomplete
      id={name}
      options={options}
      getOptionLabel={(option) => option.title}
      fullWidth
      onChange={changeHandler}
      // error={!!formState.errors && !!formState.errors[name]}
      // helperText={formState.errors && formState.errors[name]}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
};

export default InputAutocomplete;