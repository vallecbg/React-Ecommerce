import React, { useState } from "react";
import moment from "moment";
import {
  TableRow,
  TableCell,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

import productService from "../../../../../Services/productService";

const CurrentProduct = (props) => {
  const { product, classes } = props;
  const confirm = useConfirm();

  const [isDeleted, setIsDeleted] = useState(product.isDeleted);

  function setProductDeleted(newValue) {
    confirm({
      description: "Are you sure you want to delete this product?",
    }).then(() => {
      productService
        .setDelete(product._id, { isDeleted: newValue })
        .then(({ data: currProduct }) => {
          console.log("Curr product: ", currProduct);
          setIsDeleted(newValue);
        });
    });
  }

  return (
    <TableRow className={classes.tableRow} hover key={product._id}>
      <TableCell>
        <div className={classes.nameContainer}>
          <Avatar className={classes.avatar} src={product.imageUrls[0].url} />
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
      <TableCell className={isDeleted ? classes.deleted : classes.notDeleted}>
        {isDeleted ? "Yes" : "No"}
      </TableCell>
      <TableCell>
        {moment(new Date(product.createdOn)).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell>
        <Link className={classes.navLink} to={"/productEdit/" + product._id}>
          <Button fullWidth variant="contained" color="primary">
            Edit
          </Button>
        </Link>
      </TableCell>
      <TableCell>
        {!isDeleted && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setProductDeleted(true)}
          >
            Delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CurrentProduct;
