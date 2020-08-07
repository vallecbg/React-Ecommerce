const { OrderModel, UserModel, ProductModel } = require("../models");

module.exports = {
  createOrder: (req, res, next) => {
    const order = req.body;
    console.log(order);
    const { _id } = req.user;

    OrderModel.create({ ...order, creator: _id, createdOn: Date.now() })
      .then((order) => {
        Promise.all([
          order,
          UserModel.updateOne({ _id }, { $push: { orders: order._id } }),
        ]);
      })
      .then(() => {
        res.status(201).send({ msg: "Successfully created order!" });
      })
      .catch(next);
  },
  getAllOrders: (req, res, next) => {
    OrderModel.find({}).populate('products').lean()
    .then((orders) => {
      res.status(200).json(orders)
    })
    .catch(next)
},
};
