import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { StoreContext } from "../../../Store/Store";
import { Grid } from "@material-ui/core";
import { OrdersTable } from "./components";
import { TotalOrders, TotalPrice } from "../Dashboard/components";
import "react-perfect-scrollbar/dist/css/styles.css";
import userService from '../../../Services/userService'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  grids: {
    paddingBottom: theme.spacing(2)
  }
}));

const MyOrders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const id = JSON.parse(window.localStorage.getItem("user"))
    ? JSON.parse(window.localStorage.getItem("user")).id
    : null;
    userService.details(id).then(({data: currUser}) => {
      console.log(currUser);
      setOrders(currUser[0].orders)
    })
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {orders && (
          <div>
            <Grid container spacing={4} className={classes.grids}>
              <Grid item lg={6} sm={6} xl={6} xs={12}>
                <TotalOrders orders={orders.length} />
              </Grid>
              <Grid item lg={6} sm={6} xl={6} xs={12}>
                <TotalPrice
                  price={orders.reduce(
                    (acc, current) => (acc += current.totalPrice),
                    0
                  ).toFixed(2)}
                />
              </Grid>
            </Grid>
            <OrdersTable orders={orders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
