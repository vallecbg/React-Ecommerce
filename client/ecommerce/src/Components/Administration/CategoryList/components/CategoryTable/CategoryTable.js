import React, { useState, useContext } from "react";
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
import { StoreContext } from '../../../../../Store/Store'
import { deleteCategory } from '../../../../../Store/Actions'

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
  const { dispatch } = useContext(StoreContext);

  const classes = useStyles();

  function handleDelete (id) {
    dispatch(deleteCategory(id))
  }

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
                {categories.map((category) => (
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
                        onClick={() => handleDelete(category._id)}
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
    </Card>
  );
};

CategoryTable.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.array.isRequired,
};

export default CategoryTable;
