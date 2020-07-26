const { ProductModel } = require('../models')
const { authCookie: authCookieName } = require('../config/config');

module.exports = {
    createProduct: (req, res, next) => {
        const product = req.body
        console.log(product);
        const { _id } = req.user

        //const {name, category, price, description, popular, imageUrls} = req.body

        //TODO: Add validations

        ProductModel.create({...product, creator: _id})
            .then((product) => {
                Promise.all([product])
            })
            .then(() => {
                res.status(201).send({msg: 'Successfully created product!'})
            })
            .catch(next)
    },
    getAllProducts: (req, res, next) => {
        ProductModel.find({}).populate('category')
        .then((products) => {
            res.status(200).json(products)
        })
        .catch(next)
    },
    getProduct: (req, res, next) => {
        const { id } = req.params
        ProductModel.find({_id: id}).populate('category')
        .then((currentProduct) => {
            res.status(200).json(currentProduct)
        })
        .catch(next)
    }
}