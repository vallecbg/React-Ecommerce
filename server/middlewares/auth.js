const { authCookie: authCookieName } = require('../config/config');
const { tokenVerify } = require('../utils/jwt');
const { RemovedToken, UserModel } = require('../models');

function auth(redirectUnauthenticated = true) {
  return function (req, res, next) {
    const token = req.cookies[authCookieName];
    Promise.all([tokenVerify(token), RemovedToken.findOne({ token })])
      .then(([data, blackedListToken]) => {
        if (blackedListToken) {
          return Promise.reject(new Error('blacklisted token'));
        }
        UserModel.findById(data.id).then((user) => {
          req.user = user;
          next();
        });
      })
      .catch((err) => {
        if (!redirectUnauthenticated) {
          next();
          return;
        }
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
        next(err);
      });
  };
}

module.exports = auth;