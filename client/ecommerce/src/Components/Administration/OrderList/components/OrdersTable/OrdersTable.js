import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@material-ui/core";

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
}));

const OrdersTable = (props) => {
  const { className, orders, ...rest } = props;
  console.log(orders);

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

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
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.slice(0, rowsPerPage).map((order) => (
                  <TableRow className={classes.tableRow} hover key={order._id}>
                    <TableCell>
                      {order.firstName} {order.lastName}
                    </TableCell>
                    <TableCell>
                      {order.address1},{" "}
                      {order.address2 !== "" ? `[${order.address2}], ` : null}{" "}
                      {order.city} [{order.zip}],
                      {order.state !== "" ? ` ${order.state},` : null}{" "}
                      {order.country}
                    </TableCell>
                    <TableCell>
                      {order.products.map((product) => (
                        <div>
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
                        {order.status}
                    </TableCell>
                    <TableCell>
                      {moment(new Date(order.createdOn)).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={orders.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

OrdersTable.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired,
};

export default OrdersTable;
