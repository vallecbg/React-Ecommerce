import React, { useContext } from "react";
//import { StoreContext } from '../../Store/Store'
import { createStyles, makeStyles } from "@material-ui/core/styles";
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
  //const { state, dispatch } = useContext(StoreContext)
  const classes = useStyles();

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
                {` — ${product.description}`}
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              //TODO: remove item
              //onClick={}
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
    (cart || []).reduce((acc, current) => (acc += current.price), 0) / 100;

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
          <ListItem className={classes.listItem}>
            <Typography variant="subtitle1" className={classes.total}>
              Total: &#36;{renderProducts.length ? (
                  renderTotalPrice
              ): 0.00}
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Cart;
