import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { StoreContext } from '../../../Store/Store'

import { OrdersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
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
  
  console.log(result);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {result && <OrdersTable orders={result.orders} />}
      </div>
    </div>
  );
};

export default MyOrders;
