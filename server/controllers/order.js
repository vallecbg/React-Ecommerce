const { OrderModel, UserModel } = require("../models");

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
  setStatus: (req, res, next) => {
    const { id } = req.params;
    const {status} = req.body;

    console.log("Id: ", id);
    console.log("req body: ", req.body);
    
    OrderModel.findOneAndUpdate({_id: id}, {status})
      .then((order) => {
        res.status(200).json(order)
      })
      .catch((err) => {
        next(err);
      });
  }
};
