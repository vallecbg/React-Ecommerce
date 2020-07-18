import React, { Component, useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../Store/Store'
import { getAllProducts } from '../../Store/Actions'
import productService from '../../Services/productService'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../Loader/Spinner'

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
    console.log('Products: ', products);
    console.log('State Products: ', state.products);

        const renderProducts = (products.length ? products : state.products).map((product) => {
            console.log(product);
            return (
                <Grid item xs={3} key={product._id}>
                    <h1>{product.title}</h1>
                    <span>Price: {product.price}, Category: {product.category.title}</span>
                </Grid>
            )
        })

    return (
        <Grid className={classes.container} container>
            {isLoading ? (
                <Spinner />
            ) : renderProducts}
            {/* {(products.length ? products : state.products).map(product => (
                <Grid item xs={3} key={product._id}>
                    <h1>{product.title}</h1>
                    <span>Price: {product.price}, Category: {product.category.title}</span>
                </Grid>
            ))} */}
        </Grid>
    )
}

export default ProductsList


// class ProductsList extends Component {
//     static contextType = StoreContext
    
//     constructor(props) {
//         super(props)
//         this.state = {
//             loading: false,
//             allProducts: []
//         }
//     }

//     async fetchData() {
//         await this.setState({loading: true})
//         productService.getAll().then(res => res.json()).then((data) => {
//             this.setState({
//                 allProducts: data
//             }, () => {
//                 console.log(this.state);
//             })
//         })


//     }

//     componentDidMount() {
//         this.fetchData()
//         const renderProducts = this.state.allProducts.map((product) => {
//             console.log(product);
//             return (
//                 <Grid item xs={3} key={product._id}>
//                     <h1>{product.title}</h1>
//                     <span>Price: {product.price}, Category: {product.category}</span>
//                 </Grid>
//             )
//         })
//     }

//     render() {
//         return (
//         <div>{this.renderProducts}</div>
//         )
//     }
// }

