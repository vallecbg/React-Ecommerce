import React, { useState } from "react";
import moment from "moment";
import StatusBullet from "../../../../StatusBullet/StatusBullet";
import { TableRow, TableCell, Button, Typography } from "@material-ui/core";
import orderService from "../../../../../Services/orderService";

const CurrentOrder = (props) => {
  const { order, classes, controls } = props;

  const statusColors = {
    Delivered: "success",
    Processing: "info",
    Cancelled: "danger",
  };

  const [status, setStatus] = useState(order.status);

  function setOrderStatus(currStatus) {
    orderService
      .setStatus(order._id, { status: currStatus })
      .then(({ data: currOrder }) => {
        console.log("Curr order: ", currOrder);
        setStatus(currStatus);
      });
  }

  return (
    <TableRow className={classes.tableRow} hover key={order._id}>
      <TableCell>
        {order.firstName} {order.lastName}
      </TableCell>
      <TableCell>
        {order.address1},{" "}
        {order.address2 !== "" ? `[${order.address2}], ` : null} {order.city} [
        {order.zip}],
        {order.state !== "" ? ` ${order.state},` : null} {order.country}
      </TableCell>
      <TableCell>
        {order.products.map((product) => (
          <div key={product._id}>
            {product.product} - {product.quantity}x
          </div>
        ))}
      </TableCell>
      <TableCell>
        <div className={classes.nameContainer}>
          <Typography variant="body1">
            ${order.totalPrice.toFixed(2)}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        <StatusBullet
          className={classes.status}
          color={statusColors[status]}
          size="sm"
        />
        {status}
      </TableCell>
      <TableCell>
        {moment(new Date(order.createdOn)).format("DD/MM/YYYY HH:mm")}
      </TableCell>
      {controls && (
        <TableCell>
          {status === "Processing" && (
            <Button
              fullWidth
              variant="contained"
              className={classes.deliverBtn}
              onClick={() => setOrderStatus("Delivered")}
            >
              Deliver
            </Button>
          )}
        </TableCell>
      )}
      {controls && (
        <TableCell>
          {status === "Processing" && (
            <Button
              fullWidth
              variant="contained"
              className={classes.cancelBtn}
              onClick={() => setOrderStatus("Cancelled")}
            >
              Cancel
            </Button>
          )}
        </TableCell>
      )}
    </TableRow>
  );
};

export default CurrentOrder;
