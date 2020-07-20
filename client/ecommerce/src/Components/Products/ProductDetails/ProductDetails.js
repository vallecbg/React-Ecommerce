import React, { Component, useState, useEffect, useContext } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../../../Store/Store'
import { getProduct } from '../../../Store/Actions'
import productService from '../../../Services/productService'
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '80px'
    }
}))

const ProductDetails = (props) => {
    const classes = useStyles()
    const productId = props.match.params.id
    const { state, dispatch } = useContext(StoreContext)
    const [ product, setProduct ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        productService.getOne(productId).then(({data: product}) => {
            setProduct(product)
        })
        setIsLoading(false)
    }, [])

    const renderProduct = (product.length ? product : state.product).map((currProduct) => {
        return (
            <div key={currProduct._id} style={{ padding: 10 }}>
                <div
                style={{
                    marginBottom: 20,
                    marginTop: 10,
                    fontSize: 22
                }}
                >
                {currProduct.title}
                </div>
                <div style={{ display: "flex" }}>
                <img
                    src={currProduct.imageUrls[0]}
                    alt=""
                    width={250}
                    height={250}
                    style={{
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    objectFit: "cover"
                    }}
                />
                <div
                    style={{
                    flex: 1,
                    marginLeft: 20,
                    display: "flex",
                    flexDirection: "column"
                    }}
                >
                    <div
                    style={{
                        fontSize: 16
                    }}
                    >
                    Price: {currProduct.price} $
                    </div>
                    {currProduct.popular && (
                    <div style={{ fontSize: 14, marginTop: 5, color: "#228B22" }}>
                        (Popular product)
                    </div>
                    )}

                    <TextField
                    type="number"
                    value={5}
                    style={{ marginTop: 20, marginBottom: 10, width: 70 }}
                    label="Quantity"
                    inputProps={{ min: 1, max: 10, step: 1 }}
                    // onChange={e => {
                    //     this.setState({ quantity: parseInt(e.target.value) });
                    // }}
                    />
                    <Button
                    style={{ width: 170, marginTop: 5 }}
                    color="primary"
                    variant="outlined"
                    // onClick={() => {
                    //     this.props.dispatch(
                    //     addItemInCart({
                    //         ...this.state.item,
                    //         quantity: this.state.quantity
                    //     })
                    //     );
                    // }}
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
                    fontSize: 22
                }}
                >
                Product Description
                </div>
                <div
                style={{
                    maxHeight: 200,
                    fontSize: 13,
                    overflow: "auto"
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
        )
    })

    return (
        <Grid className={classes.container} container>
            {renderProduct}
        </Grid>
    )
}

export default ProductDetails

