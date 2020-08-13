import React, { Component, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../../Store/Store";
import categoryService from "../../../Services/categoryService";
import { makeStyles, Typography } from "@material-ui/core";
import ProductsList from "./ProductsList";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "80px",
  },
}));

const AllProducts = (props) => {
  const classes = useStyles();
  const [categories, setCategories] = useState();

  useEffect(() => {
    categoryService.getAll().then(({ data: currCategories }) => {
      setCategories(currCategories);
    });
  }, []);

  return (
    <div className={classes.container}>
      {categories &&
        categories.map((currCategory) => {
          return (
              <div key={currCategory._id}>
                  <Typography variant="h1" component="h2" align="center">{currCategory.title}</Typography>
                  <ProductsList products={currCategory.products} />
              </div>
          )
        })}
    </div>
  );
};

export default AllProducts;
