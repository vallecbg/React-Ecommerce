import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { StoreContext } from "../../../Store/Store";
import { Grid } from "@material-ui/core";
import { OrdersTable } from "./components";
import { TotalOrders, TotalPrice } from "../Dashboard/components";
import "react-perfect-scrollbar/dist/css/styles.css";

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
  const { fetchUserDetails } = useContext(StoreContext);

  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const { result, error, loading } = fetchUserDetails;
    setLoading(loading);
    setError(error);
    setResult(result);
  }, [fetchUserDetails]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {result && (
          <div>
            <Grid container spacing={4} className={classes.grids}>
              <Grid item lg={6} sm={6} xl={6} xs={12}>
                <TotalOrders orders={result.orders.length} />
              </Grid>
              <Grid item lg={6} sm={6} xl={6} xs={12}>
                <TotalPrice
                  price={result.orders.reduce(
                    (acc, current) => (acc += current.totalPrice),
                    0
                  ).toFixed(2)}
                />
              </Grid>
            </Grid>
            <OrdersTable orders={result.orders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
