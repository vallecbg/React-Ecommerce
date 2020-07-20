const { authCookie: authCookieName } = require('../config/config');
const { tokenVerify } = require('../utils/jwt');
const { RemovedToken, UserModel } = require('../models');

function admin() {
  return function (req, res, next) {
    const token = req.cookies[authCookieName];
    Promise.all([tokenVerify(token), RemovedToken.findOne({ token })])
      .then(([data, blackedListToken]) => {
        if (blackedListToken) {
          return Promise.reject(new Error('blacklisted token'));
        }
        UserModel.findById(data.id).populate('role').then((user) => {
          if(user.role.name !== "Admin"){
            res
              .status(401)
              .send({ msg: 'You are not admin!' });
            return;
          }
          req.user = user;
          next();
        });
      })
      .catch((err) => {
        if (err.name === 'TokenExpiredError' && err.message === 'jwt expired') {
          res
            .status(401)
            .send({ msg: 'Token is expired, you are unauthorized' });
          return;
        }
        if (err.message === 'blacklisted token') {
          res
            .status(401)
            .send({ msg: 'Token is blacklisted, you are unauthorized' });
          return;
        }
        if (err.message === 'jwt must be provided') {
          res
            .status(401)
            .send({ msg: 'Token is not provide, you are unauthorized' });
          return;
        }
        // if (err.message === 'not admin') {
        //   res
        //     .status(401)
        //     .send({ msg: 'You are not admin!' });
        //   return;
        // }
        next(err);
      });
  };
}

module.exports = admin;