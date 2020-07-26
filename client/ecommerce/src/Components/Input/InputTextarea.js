import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextareaAutosize } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // textarea: {
  //   resize: 'none',
  // },
  error: {
    color: '#f44336',
    fontSize: 12,
    marginLeft: 14,
    marginTop: 0,
  },
}));

const InputTextarea = ({
  cols,
  rows,
  label,
  name,
  handleChange,
  runControlValidation,
  formState,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <TextareaAutosize
        cols={cols}
        rows={rows}
        className={classes.textarea}
        placeholder={label}
        id={name}
        onChange={handleChange}
        onBlur={runControlValidation(name)}
        value={formState.form[name]}
      />
      {formState.errors && formState.errors[name] ? (
        <p className={classes.error}>{formState.errors[name]}</p>
      ) : null}
    </Fragment>
  );
};

InputTextarea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  runControlValidation: PropTypes.func,
  formState: PropTypes.object,
};

export default InputTextarea;