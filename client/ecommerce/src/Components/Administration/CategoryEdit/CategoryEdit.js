import React, { useContext, useCallback, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import withForm from "../../../Hocs/withForm";
import { StoreContext } from "../../../Store/Store";
import { createProduct } from "../../../Store/Actions";
import * as yup from "yup";
import PropTypes from "prop-types";
import "react-perfect-scrollbar/dist/css/styles.css";
import categoryService from "../../../Services/categoryService";
import CategoryFields from "../Category/CategoryFields";
import ListIcon from "@material-ui/icons/List";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkUrl: {
    color: "#3F59B7",
    textDecoration: "none",
  },
  textH5: {
    color: colors.blueGrey[900],
    fontWeight: 400,
    fontSize: "1.5rem",
    letterSpacing: "0em",
    lineHeight: "1.334",
  },
}));

//TODO

const CategoryEdit = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);

  const categoryId = props.match.params.id;

  const { runValidations, formIsInvalid, history, formState } = props;

  useEffect(() => {
    categoryService.getOne(categoryId).then((currCategory) => {
      console.log(currCategory.data[0]);
      Object.assign(formState.form, {
        ...formState.form,
        ...currCategory.data[0],
      });
    });
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        const finalCategory = {
          ...formData,
        };
        console.log("finalCategory: ", finalCategory);
        categoryService
          .edit(finalCategory)
          .then(() => {
            //TODO: add notifications
            history.push("/");
          })
          .catch((error) => console.error(error));
      });
    },
    [history, dispatch, runValidations]
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ListIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.textH5}>
              Edit Category
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <CategoryFields {...props} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={formIsInvalid()}
              >
                Edit Category
              </Button>
            </form>
          </div>
        </Container>
      </Grid>
    </div>
  );
};

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 symbols"),
});

const initialState = {
  title: "",
};

CategoryEdit.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(CategoryEdit, initialState, schema);
