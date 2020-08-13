import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import "react-perfect-scrollbar/dist/css/styles.css";
import orderService from "../../../Services/orderService";
import userService from "../../../Services/userService";
import productService from "../../../Services/productService";

import {
  TotalOrders,
  TotalUsers,
  TotalProducts,
  TotalPrice,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders,
} from "./components";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const renderTotalPrice = orders.reduce(
    (acc, current) =>
      (acc += current.totalPrice),
    0
  );

  function compareDates(a, b) {
    const aDate = new Date(a.createdOn)
    const bDate = new Date(b.createdOn)

    if(aDate < bDate){
      return 1
    } else if (aDate > bDate){
      return -1
    } else {
      return 0
    }
  }

  useEffect(() => {
    orderService.getAll().then(({ data: currOrders }) => {
      setOrders(currOrders);
    });
    userService.getAll().then(({ data: currUsers }) => {
      setUsers(currUsers);
    });
    productService.getAll().then(({ data: currProducts }) => {
      setProducts(currProducts);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalOrders orders={orders.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers users={users.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProducts products={products.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalPrice price={renderTotalPrice.toFixed(2)} text={"TOTAL INCOME"} />
        </Grid>
        {/* <Grid item lg={4} md={6} xl={3} xs={12}>
          <UsersByDevice />
        </Grid> */}
        <Grid item lg={4} md={12} xl={3} xs={12}>
          <LatestProducts allProducts={products.sort(compareDates).slice(0, 5)} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestOrders allOrders={orders.sort(compareDates).slice(0, 6)} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <LatestSales orders={orders}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
