const { CategoryModel } = require('../models')

module.exports = {
    createCategory: (req, res, next) => {
        const category = req.body

        const { title } = category
        
        if(!title){
            return res.status(400)
            .send({msg: "Invalid body!"})
        }

        CategoryModel.create({...category})
            .then((category) => {
                Promise.all([category])
            })
            .then(() => {
                res.status(201).send({msg: 'Successfully created category!'})
            })
            .catch(next)
    },
    getAllCategories: (req, res, next) => {
        CategoryModel.find({})
        .then((categories) => {
            res.json(categories)
        })
        .catch(next)
    }
}