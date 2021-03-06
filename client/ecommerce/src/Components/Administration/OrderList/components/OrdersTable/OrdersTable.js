import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
} from "@material-ui/core";
import CurrentOrder from './CurrentOrder'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  cancelBtn: {
    backgroundColor: theme.palette.error.light,
    color: 'white'
  },
  deliverBtn: {
    backgroundColor: theme.palette.success.light,
    color: 'white'
  }
}));

const OrdersTable = (props) => {
  const { className, orders, controls, ...rest } = props;
  console.log(orders);

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Recipient</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ordered on</TableCell>
                  {controls ? (
                    <TableCell></TableCell>
                  ) : null}
                  {controls ? (
                    <TableCell></TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <CurrentOrder order={order} classes={classes} controls={controls} key={order._id}/>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

OrdersTable.propTypes = {
  className: PropTypes.string,
};

export default OrdersTable;
