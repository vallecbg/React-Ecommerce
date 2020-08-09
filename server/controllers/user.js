const { UserModel } = require('../models')

module.exports = {
    getUser: (req, res, next) => {
        const { id } = req.params
        UserModel.find({_id: id}).populate('orders')
        .then((currentUser) => {
            console.log(currentUser);
            res.status(200).json(currentUser)
        })
        .catch(next)
    },
    getAll: (req, res, next) => {
        UserModel.find({})
        .then((currentUsers) => {
            console.log(currentUsers);
            res.status(200).json(currentUsers)
        })
        .catch(next)
    },
    setRole: (req, res, next) => {
        const { id } = req.params;
        const {role} = req.body;
        
        UserModel.findOneAndUpdate({_id: id}, {role})
          .then((user) => {
            res.status(200).json(user)
          })
          .catch((err) => {
            next(err);
          });
      }
}