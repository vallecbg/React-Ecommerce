import React, { useContext, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MatLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import withForm from '../../../Hocs/withForm'
import { StoreContext } from '../../../Store/Store'
import { register } from '../../../Store/Actions'
import * as yup from 'yup';
import InputField from '../../Input/InputField'
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkUrl: {
    textDecoration: 'none'
  }
}));

const Register = ({
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
}) => {

  const classes = useStyles();
  const { dispatch } = useContext(StoreContext)

  const handleOnChangeFirstName = changeHandlerFactory('firstName')
  const handleOnChangeLastName = changeHandlerFactory('lastName')
  const handleOnChangeEmail = changeHandlerFactory('email')
  const handleOnChangePassword = changeHandlerFactory('password')
  const handleOnChangeRePassword = changeHandlerFactory('rePassword')

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        dispatch(register(formData));
        history.push('/');
      });
    },
    [history, dispatch, runValidations]
  );


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField 
                label={'First Name'}
                name={'firstName'}
                changeHandler={handleOnChangeFirstName}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField 
                label={'Last Name'}
                name={'lastName'}
                changeHandler={handleOnChangeLastName}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField 
                label={'Email Address'}
                name={'email'}
                changeHandler={handleOnChangeEmail}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField 
                label={'Password'}
                name={'password'}
                type={'password'}
                changeHandler={handleOnChangePassword}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField 
                label={'Repeat Password'}
                name={'rePassword'}
                type={'password'}
                changeHandler={handleOnChangeRePassword}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formIsInvalid()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.linkUrl} to="/login">
                <MatLink variant="body2">
                Already have an account? Sign in
                </MatLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Must be valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 symbols'),
    rePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password don`t match')
    .required('Password is required')
    .min(6, 'Password must be at least 6 symbols'),
})

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: ''
}

Register.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(Register, initialState, schema)
