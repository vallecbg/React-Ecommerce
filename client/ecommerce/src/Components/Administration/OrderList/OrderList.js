import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import orderService from '../../../Services/orderService'

import { OrdersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const OrderList = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.getAll().then(({ data: currOrders }) => {
      setOrders(currOrders);
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <OrdersTable orders={orders} controls={true} />
      </div>
    </div>
  );
};

export default OrderList;
