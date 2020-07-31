import React, { useContext } from "react";
import { StoreContext } from "../../Store/Store";
import {
  removeProductFromCartSuccess,
  updateCartSuccess,
} from "../../Store/Actions";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Container,
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    listItem: {
      padding: theme.spacing(1, 0),
      justifyContent: "flex-end",
    },
    total: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize * 2,
    },
    underHeader: {
      marginTop: "12vh",
    },
    productImage: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      marginRight: 10,
    },
  })
);

const Cart = () => {
  const { state, dispatch } = useContext(StoreContext);
  const classes = useStyles();

  const removeProduct = (product) => {
    dispatch(removeProductFromCartSuccess(product));
  };

  const increaseQuantity = (product) => {
    dispatch(
      updateCartSuccess({
        product,
        value: product.quantity + 1,
      })
    );
  };

  const decreaseQuantity = (product) => {
    dispatch(
      updateCartSuccess({
        product,
        value: product.quantity <= 1 ? 1 : product.quantity - 1,
      })
    );
  };

  const cart = JSON.parse(window.localStorage.getItem("cart"));
  const renderProducts = (cart || []).map((product) => {
    return (
      <React.Fragment key={product._id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              className={classes.productImage}
              alt="Product"
              src={product.imageUrls[0]}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  &#36;{(product.price / 100).toFixed(2)}
                </Typography>
                {` — ${product.description}`} <br />
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="error"
                >
                  {`Quantity : ${product.quantity}`}
                </Typography>
              </React.Fragment>
            }
          />

          <ListItemSecondaryAction>
            <IconButton
              color="primary"
              edge="end"
              aria-label="increase"
              onClick={() => increaseQuantity(product)}
            >
              <AddCircleIcon />
            </IconButton>
            <IconButton
              color="secondary"
              edge="end"
              aria-label="decrease"
              onClick={() => decreaseQuantity(product)}
            >
              <IndeterminateCheckBoxIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeProduct(product)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    );
  });

  const renderTotalPrice =
    (cart || []).reduce(
      (acc, current) => (acc += current.price * current.quantity),
      0
    ) / 100;

  return (
    <Container maxWidth="md" className={classes.underHeader}>
      <Box mt={5} mb={5}>
        <Typography component="h1" variant="h6" color="primary" gutterBottom>
          Shopping Basket
        </Typography>
        <Typography component="p" variant="subtitle1">
          You have {renderProducts.length} items in your basket
        </Typography>
        <List className={classes.root}>
          {renderProducts.length ? renderProducts : null}
          <ListItem>
            <Typography variant="subtitle1" className={classes.total}>
              Total: &#36;{renderProducts.length ? renderTotalPrice : 0.0}
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              variant="contained"
              color="primary"
              disabled={renderProducts.length <= 0}
            >
              <ShoppingCartIcon />
              Checkout
            </Button>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Cart;
