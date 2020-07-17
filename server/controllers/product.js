const { ProductModel } = require('../models')

module.exports = {
    createProduct: (req, res, next) => {
        console.log(req);
        const product = req.body
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
    }
}