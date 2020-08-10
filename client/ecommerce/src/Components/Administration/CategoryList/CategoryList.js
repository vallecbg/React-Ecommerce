import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import categoryService from '../../../Services/categoryService'

import { CategoryTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const CategoryList = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.getAll().then(({ data: currCategories }) => {
      setCategories(currCategories);
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <CategoryTable categories={categories} />
      </div>
    </div>
  );
};

export default CategoryList;
