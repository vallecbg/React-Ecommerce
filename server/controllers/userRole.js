const { UserRoleModel } = require('../models')

module.exports = {
    createRole: (req, res, next) => {
        const role = req.body

        UserRoleModel.create({...role})
            .then((role) => {
                Promise.all([role])
            })
            .then(() => {
                res.status(201).send({msg: 'Successfully created role!'})
            })
            .catch(next)
    }
}