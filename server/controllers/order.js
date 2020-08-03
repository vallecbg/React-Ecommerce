const { OrderModel } = require('../models')

module.exports = {
    createOrder: (req, res, next) => {
        const order = req.body
        console.log(order);
        const { _id } = req.user

        OrderModel.create({...order, creator: _id})
            .then((order) => {
                Promise.all([order])
            })
            .then(() => {
                res.status(201).send({msg: 'Successfully created order!'})
            })
            .catch(next)
    },
}