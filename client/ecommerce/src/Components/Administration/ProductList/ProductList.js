import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import productService from '../../../Services/productService'

import { ProductsTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAll().then(({ data: currProducts }) => {
      setProducts(currProducts);
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ProductsTable products={products} />
      </div>
    </div>
  );
};

export default ProductList;
