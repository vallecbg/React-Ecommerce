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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button
} from "@material-ui/core";
import { Link } from 'react-router-dom'

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
  navLink: {
    textDecoration: 'none'
  }
}));

const ProductsTable = (props) => {
  const { className, products, ...rest } = props;

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
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Delivery</TableCell>
                  <TableCell>Is Popular</TableCell>
                  <TableCell>Created on</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.slice(0, rowsPerPage).map((product) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={product._id}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={product.imageUrls[0].url}
                        />
                        <Typography variant="body1">{product.title}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{product.category.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      {product.delivery <= 0
                        ? "Free Delivery"
                        : `$${product.delivery.toFixed(2)}`}
                    </TableCell>
                    <TableCell>{product.popular ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {moment(new Date(product.createdOn)).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      <Link className={classes.navLink} to={"/productEdit/" + product._id}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                        >
                          Edit
                        </Button>
                      </Link>
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
          count={products.length}
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

ProductsTable.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired,
};

export default ProductsTable;
