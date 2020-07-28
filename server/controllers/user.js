const { UserModel } = require('../models')

module.exports = {
    getUser: (req, res, next) => {
        const { id } = req.params
        UserModel.find({_id: id}).populate('role')
        .then((currentUser) => {
            console.log(currentUser);
            res.status(200).json(currentUser)
        })
        .catch(next)
    }
}