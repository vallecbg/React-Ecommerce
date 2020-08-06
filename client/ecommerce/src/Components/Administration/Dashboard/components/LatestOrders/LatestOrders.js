import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import StatusBullet from "../../../../StatusBullet/StatusBullet";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const statusColors = {
  Delivered: "success",
  Processing: "info",
  Cancelled: "danger",
};

const LatestOrders = (props) => {
  const { className, allOrders, ...rest } = props;
  const classes = useStyles();

  const renderAllOrders = allOrders.map((currOrder) => {
    return (
      <TableRow hover key={currOrder._id}>
        <TableCell>{currOrder._id}</TableCell>
        <TableCell>
          {currOrder.firstName} {currOrder.lastName}
        </TableCell>
        <TableCell>${currOrder.totalPrice.toFixed(2)}</TableCell>
        <TableCell>
          {moment(new Date(currOrder.createdOn)).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell>
          <div className={classes.statusContainer}>
            <StatusBullet
              className={classes.status}
              color={statusColors[currOrder.status]}
              size="sm"
            />
            {currOrder.status}
          </div>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title="Latest Orders"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Ref</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderAllOrders}</TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
};

export default LatestOrders;
