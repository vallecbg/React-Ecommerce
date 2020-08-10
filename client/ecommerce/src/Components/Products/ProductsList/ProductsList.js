import React, { Component, useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../../Store/Store'
import { getAllProducts } from '../../../Store/Actions'
import productService from '../../../Services/productService'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../Loader/Spinner'
import ProductItem from './ProductItem'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '50px'
    }
}))

const ProductsList = () => {
    const classes = useStyles()
    const { state, dispatch } = useContext(StoreContext)
    const [ products ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getAllProducts())
        setIsLoading(false)
    }, [])
    
    const renderProducts = (products.length ? products : state.products).map((product) => {
            return (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                    <ProductItem product={product}/>
                </Grid>
            )
        })

    return (
        <Grid className={classes.container} container spacing={2}>
            {isLoading ? (
                <Spinner />
            ) : renderProducts}
        </Grid>
    )
}

export default ProductsList

