import React, { Component, useState, useEffect, useContext, useCallback } from 'react'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import { StoreContext } from '../../../Store/Store'
import { addProductToCart } from '../../../Store/Actions'

const useStyles = makeStyles((theme) => ({
  navLink : {
    textDecoration: 'none',
  }
}))


const ProductItem = ({product}) => {
  const classes = useStyles()
  const history = useHistory()
  const { dispatch } = useContext(StoreContext)

  const handleAddToCart = useCallback((product) => {
    console.log(product)
    dispatch(addProductToCart(product))
  }, [dispatch, product])

  return (
        <Card
        style={{ width: 200, height: 270, margin: 10, display: "inline-block" }}
      >
        <CardActionArea
          onClick={() => {
            console.log(history)
            history.push("/product/details/" + product._id);
          }}
        >
          <CardMedia
            style={{ height: 140 }}
            image={product.imageUrls[0].url}
          />
          <CardContent style={{ height: 50 }}>
            <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {product.title}
            </div>
            <div style={{ margin: 5 }}>Price: {product.price} $</div>
            <div style={{ color: "#1a9349", fontWeight: "bold", margin: 5 }}>
              {product.popular && "Popular"}
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ display: "flex", alignItems: "center", height: 45 }}
        >
          <Link className={classes.navLink} to={"/product/details/" + product._id}>
            <Button
              size="small"
              style={{ marginRight: 60 }}
              onClick={() => {
                history.push({
                  pathName: "/product/details/" + product._id
                });
              }}
            >
              {" "}
              Details
            </Button>
          </Link>
          <Tooltip title="Add to cart">
            <IconButton
              size="small"
              onClick={() => handleAddToCart(product)}
              color="primary"
              aria-label="Add to shopping cart"
            >
              <AddShoppingCartIcon size="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
}

export default ProductItem