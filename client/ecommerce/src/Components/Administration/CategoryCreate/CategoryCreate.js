import React, { useContext, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import ListIcon from "@material-ui/icons/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import withForm from "../../../Hocs/withForm";
import { StoreContext } from "../../../Store/Store";
import { createCategory } from "../../../Store/Actions";
import * as yup from "yup";
import PropTypes from "prop-types";
import "react-perfect-scrollbar/dist/css/styles.css";

import CategoryFields from "../Category/CategoryFields";

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

const ProductCreate = (props) => {
  const classes = useStyles();
  const { dispatch } = useContext(StoreContext);
  const { runValidations, formIsInvalid, history } = props;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        dispatch(createCategory(formData));
        history.push("/");
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
              Create Category
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
                Create Category
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

ProductCreate.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(ProductCreate, initialState, schema);
