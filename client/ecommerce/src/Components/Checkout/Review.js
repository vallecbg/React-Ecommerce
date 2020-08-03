import React, { useCallback, useContext } from "react";
import { useHistory } from 'react-router-dom'
import { StoreContext } from '../../Store/Store'
import { createOrder, resetCartSuccess, createOrderFail } from '../../Store/Actions'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function Review({ userData, handleBack }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext)
  const history = useHistory()
  const cart = window.localStorage['cart'] ? JSON.parse(window.localStorage.getItem('cart')) : [];

  const renderProducts = (cart || []).map((product) => {
    return (
      <ListItem className={classes.listItem} key={product.title}>
        <ListItemText primary={product.title} secondary={product.description} />
        <Typography variant="body2">
          ${product.price.toFixed(2)} x {product.quantity}
        </Typography>
      </ListItem>
    );
  });

  const cartProductsIds = (cart || []).map((product) => {
    return {
      _id: product._id,
      quantity: product.quantity
    }
  })

  const renderTotalDelivery = (cart || []).reduce(
    (acc, current) => (acc += current.delivery),
    0
  );

  const renderTotalPrice = (cart || []).reduce(
    (acc, current) =>
      (acc += ((current.price * current.quantity) + current.delivery)),
    0
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(cartProductsIds);
      if(cartProductsIds.length > 0){
        const finalOrder = {
          creator: window.localStorage.getItem('user').id,
          products: cartProductsIds,
          totalPrice: renderTotalPrice,
          status: 'Processing',
          firstName: userData.firstName,
          lastName: userData.lastName,
          address1: userData.address1,
          address2: userData.address2,
          city: userData.city,
          state: userData.state,
          zip: userData.zip,
          country: userData.country,
        };
        console.log(finalOrder);
        dispatch(createOrder(finalOrder));
        dispatch(resetCartSuccess())
        history.push('/');
      } else {
        dispatch(createOrderFail("Error"));
        history.push('/');
      }
    },
    [history, dispatch, userData]
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {renderProducts.length > 0 ? renderProducts : null}
        <ListItem className={classes.listItem} key={"Shipping"}>
          <ListItemText primary={"Shipping"} secondary={""} />
          <Typography variant="body2">
            {renderTotalDelivery > 0
              ? `$${renderTotalDelivery.toFixed(2)}`
              : `Free Shipping`}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${renderProducts.length ? renderTotalPrice.toFixed(2) : 0.0}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        {userData ? (
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            <Typography gutterBottom>
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography gutterBottom>
              {userData.address1}, {userData.city} [{userData.zip}],
              {userData.state !== "" ? ` ${userData.state},` : null}{" "}
              {userData.country}
            </Typography>
            {userData.address2 !== "" ? (
              <Typography gutterBottom>
                {userData.address2}, {userData.city} [{userData.zip}],
                {userData.state !== "" ? ` ${userData.state},` : null}{" "}
                {userData.country}
              </Typography>
            ) : null}
          </Grid>
        ) : null}
        <Grid item xs={12} sm={12} container spacing={0} justify="flex-end">
          <div className={classes.buttons}>
            <Button onClick={handleBack} className={classes.button}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
            >
              {"Place Order"}
            </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
