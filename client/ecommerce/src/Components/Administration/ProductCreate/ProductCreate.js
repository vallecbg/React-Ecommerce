import React, { useContext, useCallback, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import withForm from '../../../Hocs/withForm'
import { StoreContext } from '../../../Store/Store'
import { login } from '../../../Store/Actions'
import * as yup from 'yup';
import InputField from '../../Input/InputField'
import PropTypes from 'prop-types';
import 'react-perfect-scrollbar/dist/css/styles.css'
import InputAutocomplete from '../../Input/InputAutocomplete'
import categoryService from '../../../Services/categoryService'
import InputCheckbox from '../../Input/InputCheckbox'
import InputNumber from '../../Input/InputNumber'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '40px'
  },
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
    color: '#3F59B7',
    textDecoration: 'none'
  },
  textH5: {
    color: colors.blueGrey[900],
    fontWeight: 400,
    fontSize: '1.5rem',
    letterSpacing: '0em',
    lineHeight: '1.334'
  }
}));



const ProductCreate = ({
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
}) => {

  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext)
  const [ categories, setCategories ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  const [popular, setPopular] = useState(false)

  const handleChangePopular = (event) => {
      setPopular(event.target.checked)
      console.log(popular);
  }

  useEffect(() => {
    setIsLoading(true)
    categoryService.getAll().then(({data: categories}) => {
        setCategories(categories)
    })
    setIsLoading(false)
  }, [])

  const handleOnChangeTitle = changeHandlerFactory('title')
  const handleOnChangeCategory = changeHandlerFactory('category')
  const handleOnChangePrice = changeHandlerFactory('price')
  const handleOnChangePassword = changeHandlerFactory('password')

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        dispatch(login(formData));
        history.push('/');
      });
    },
    [history, dispatch, runValidations]
  );


  return (
    <div className={classes.root}>
        <Grid
            container
            spacing={4}
        >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <ShoppingBasketIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.textH5}>
                    Create Product
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputField 
                                    label={'Title'}
                                    name={'title'}
                                    changeHandler={handleOnChangeTitle}
                                    runControlValidation={runControlValidation}
                                    formState={formState}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputAutocomplete
                                    label={'Category'}
                                    name={'category'}
                                    changeHandler={handleOnChangeCategory}
                                    runControlValidation={runControlValidation}
                                    formState={formState}
                                    options={categories}
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
                                <InputCheckbox
                                    label={'Popular Product'}
                                    name={'popular'}
                                    changeHandler={handleChangePopular}
                                    //formState={formState}
                                    checked={popular}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputNumber 
                                    label={'Price'}
                                    name={'price'}
                                    type={'number'}
                                    changeHandler={handleOnChangePrice}
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
                            Create Product
                        </Button>
                    </form>
                </div>
            </Container>
        </Grid>
    </div>
    
  );
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 symbols'),
  category: yup
    .string()
    .required('Category is required'),
  price: yup
    .number()
    .required('Price is required')
    .moreThan(0, 'Price must be positive number'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 symbols'),
})

const initialState = {
  title: '',
  category: '',
  price: 0,
  password: '',
}

ProductCreate.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(ProductCreate, initialState, schema)

