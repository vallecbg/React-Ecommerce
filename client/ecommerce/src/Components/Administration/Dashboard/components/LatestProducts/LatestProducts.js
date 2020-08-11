import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    padding: 0,
  },
  image: {
    height: 48,
    width: 48,
  },
  actions: {
    justifyContent: "flex-end",
  },
  productImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10,
  },
  navBtn: {
    textDecoration: 'none'
  }
}));

const LatestProducts = (props) => {
  const { className, allProducts, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subtitle={`${allProducts.length} in total`}
        title="Latest products"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {allProducts.map((currProduct, i) => {
            return (
              <ListItem
                divider={i < allProducts.length - 1}
                key={currProduct._id}
              >
                <ListItemAvatar>
                  <Avatar
                    className={classes.productImage}
                    alt="Product"
                    src={currProduct.imageUrls[0].url}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={currProduct.title}
                  secondary={`Updated ${moment(
                    new Date(currProduct.createdOn)
                  ).fromNow()}`}
                />
                <IconButton edge="end" size="small">
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Link to="/productList" className={classes.navBtn}>
          <Button color="primary" size="small" variant="text">
            View all <ArrowRightIcon />
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string,
};

export default LatestProducts;
