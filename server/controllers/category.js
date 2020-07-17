const { CategoryModel } = require('../models')

module.exports = {
    createCategory: (req, res, next) => {
        const category = req.body

        //const {name, category, price, description, popular, imageUrls} = req.body

        //TODO: Add validations

        CategoryModel.create({...category})
            .then((category) => {
                Promise.all([category])
            })
            .then(() => {
                res.status(201).send({msg: 'Successfully created category!'})
            })
            .catch(next)
    }
}