import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

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
}));

export default function Review({ userData }) {
  const classes = useStyles();
  const cart = JSON.parse(window.localStorage.getItem("cart"));
  console.log(userData);
  // const {
  //   firstName,
  //   lastName,
  //   address1,
  //   address2,
  //   city,
  //   country,
  //   state,
  //   zip,
  // } = userData;

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

  const renderTotalDelivery = (cart || []).reduce(
    (acc, current) => (acc += current.delivery),
    0
  );

  const renderTotalPrice = (cart || []).reduce(
    (acc, current) => (acc += (current.price * current.quantity) + current.delivery),
    0
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
        <Typography variant="body2">{renderTotalDelivery > 0 ? (
          `$${renderTotalDelivery.toFixed(2)}`
        ) : `Free Shipping`}</Typography>
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
              {userData.state !== "" ? ` ${userData.state},` : null} {userData.country}
            </Typography>
            {userData.address2 !== "" ? (
              <Typography gutterBottom>
                {userData.address2}, {userData.city} [{userData.zip}], 
                {userData.state !== "" ? ` ${userData.state},` : null} {userData.country}
              </Typography>
            ) : null}
          </Grid>
        ) : null}
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
