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
import ProductFields from "../Product/ProductFields";

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

const notFoundImg =
  "https://res.cloudinary.com/vallec/image/upload/v1595719226/600px-No_image_available.svg_o3sq2z.png";

const ProductCreate = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [popular, setPopular] = useState(false);
  let isPopularSelected = false;

  const handleChangePopular = (event) => {
    setIsLoading(true);
    setPopular(event.target.checked);
    isPopularSelected = event.target.checked;
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Popular updated ", popular);
  }, [popular]);

  useEffect(() => {
    if (categories.length === 0) {
      setIsLoading(true);
      categoryService.getAll().then(({ data: categories }) => {
        setCategories(categories);
      });
      //setCategory(categories[0])
      setIsLoading(false);
    }
  }, []);

  const { runValidations, formIsInvalid, history } = props;

  const selectTrue = (prop1, prop2) => {
    if (prop1) {
      return prop1;
    } else if (prop2) {
      return prop2;
    }
    return false;
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        if (category === null) {
          alert("Category is null");
        } else {
          console.log(formData);
          const finalProduct = {
            ...formData,
            popular: selectTrue(popular, isPopularSelected),
            category,
            imageUrls:
              productImages.length === 0
                ? [{ url: notFoundImg }]
                : productImages,
            creator: window.localStorage.getItem("user").id,
            isDeleted: false
          };
          dispatch(createProduct(finalProduct));
          history.push("/");
        }
      });
    },
    [history, dispatch, runValidations, productImages, category, popular]
  );

  const makeValue = (event, value) => {
    if (value) {
      console.log("Category value ", value.title);
      setCategory(value._id);
    } else {
      setCategory(null)
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
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
              <ProductFields
                {...props}
                handleChangePopular={handleChangePopular}
                popular={popular}
                categories={categories}
                isLoading={isLoading}
                handleChangeCategory={makeValue}
                productImages={productImages}
                setProductImages={setProductImages}
              />
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
};

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required ")
    .min(3, "Title must be at least 3 symbols "),
  //category: yup.string().required("Category is required "),
  price: yup
    .number()
    .required("Price is required ")
    .moreThan(0, "Price must be positive number "),
  delivery: yup.number().min(0, "Delivery must be at least 0.00"),
  //popular: yup.boolean(),
  description: yup
    .string()
    .required("Description is required ")
    .min(10, "Description must be at least 10 characters "),
});

const initialState = {
  title: "",
  price: 0.01,
  delivery: 0,
  description: "",
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
