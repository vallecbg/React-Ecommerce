import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
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
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
    textDecoration: "none",
  },
  deleteBtn: {
    backgroundColor: theme.palette.error.light,
    color: 'white'
  },
}));

const CategoryTable = (props) => {
  const { className, categories, ...rest } = props;

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
                  <TableCell>Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.slice(0, rowsPerPage).map((category) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={category._id}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{category._id}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{category.title}</TableCell>
                    <TableCell>
                      <Link
                        className={classes.navLink}
                        to={"/categoryEdit/" + category._id}
                      >
                        <Button fullWidth variant="contained" color="primary">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        variant="contained"
                        className={classes.deleteBtn}
                        //onClick={() => setOrderStatus("Cancelled")}
                      >
                        Delete
                      </Button>
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
          count={categories.length}
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

CategoryTable.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.array.isRequired,
};

export default CategoryTable;
