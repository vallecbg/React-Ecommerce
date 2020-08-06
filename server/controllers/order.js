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
        //console.log(orders[5].products[0]);
        // ProductModel.find({_id: orders[5].products[0]._id}).then((currentProduct) => {
        //     console.log(currentProduct);
        // })
        res.status(200).json(orders)
    })
    .catch(next)
},
};
