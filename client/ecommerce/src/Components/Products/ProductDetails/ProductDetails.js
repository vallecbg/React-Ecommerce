import React, { useState, useEffect, useContext, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StoreContext } from "../../../Store/Store";
import { updateCartSuccess } from "../../../Store/Actions";
import productService from "../../../Services/productService";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import TextField from "@material-ui/core/TextField";
import ImageGallery from "react-image-gallery";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "80px",
  },
}));

const ProductDetails = (props) => {
  const classes = useStyles();
  const productId = props.match.params.id;
  const { state, dispatch } = useContext(StoreContext);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(
    (currProduct) => {
      console.log("Current product: ", currProduct);
      console.log("Quantity from details: ", quantity);
      dispatch(
        updateCartSuccess({
          product: currProduct,
          value: currProduct.quantity ? currProduct.quantity : quantity,
        })
      );
    },
    [dispatch, product]
  );

  useEffect(() => {
    setIsLoading(true);
    productService.getOne(productId).then(({ data: product }) => {
      setProduct(product);
    });
    setIsLoading(false);
  }, []);

  const renderProduct = (product.length ? product : state.product).map(
    (currProduct) => {
      const productImages = currProduct.imageUrls.map((currImage) => {
        return {original: currImage.url, thumbnail: currImage.url}
      })
      console.log(productImages);

      return (
        <div key={currProduct._id} style={{ padding: 10 }}>
          {/* TODO: add react image gallery */}
          <div style={{ display: "flex" }}>
            <ImageGallery items={productImages} />
            {/* <img
              src={currProduct.imageUrls[0].url}
              alt=""
              width={250}
              height={250}
              style={{
                border: "1px solid lightgray",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            /> */}

            <div
              style={{
                flex: 1,
                marginLeft: 20,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  marginBottom: 20,
                  marginTop: 10,
                  fontSize: 22,
                }}
              >
                {currProduct.title}
              </div>
              <div
                style={{
                  fontSize: 16,
                }}
              >
                Price: ${currProduct.price.toFixed(2)}
              </div>
              <div
                style={{
                  fontSize: 14,
                  marginTop: 5,
                }}
              >
                {currProduct.delivery > 0
                  ? `Delivery: $${currProduct.delivery.toFixed(2)}`
                  : `Free Delivery`}
              </div>
              {currProduct.popular && (
                <div style={{ fontSize: 14, marginTop: 5, color: "#228B22" }}>
                  (Popular product)
                </div>
              )}

              <TextField
                type="number"
                value={quantity}
                style={{ marginTop: 20, marginBottom: 10, width: 70 }}
                label="Quantity"
                inputProps={{ min: 1, max: 10, step: 1 }}
                onChange={(e) => {
                  currProduct.quantity = parseInt(e.target.value);
                  console.log("Curr product: ", currProduct.quantity);
                  setQuantity(parseInt(e.target.value));
                }}
              />
              <Button
                style={{ width: 170, marginTop: 5 }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleAddToCart(currProduct);
                }}
              >
                Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
              </Button>
            </div>
          </div>

          {/* Product description */}
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              fontSize: 22,
            }}
          >
            Product Description
          </div>
          <div
            style={{
              maxHeight: 200,
              fontSize: 13,
              overflow: "auto",
            }}
          >
            {currProduct.description
              ? currProduct.description
              : "Not available"}
          </div>

          {/* Relateditems */}
          {/* <div
                style={{
                    marginTop: 20,
                    marginBottom: 10,
                    fontSize: 22
                }}
                >
                Related Items
                </div>
                {this.state.relatedItems.slice(0, 3).map(x => {
                return <Item key={x.id} item={x} />;
                })} */}
        </div>
      );
    }
  );
  //TODO: set is loading spinner
  return (
    <Grid className={classes.container} container>
      {renderProduct}
    </Grid>
  );
};

export default ProductDetails;
