const { UserModel, RemovedToken } = require("../models");
const { tokenCreate } = require("../utils/jwt");
const { authCookie: authCookieName } = require("../config/config");

module.exports = {
  login: (req, res, next) => {
    const { email, password } = req.body;
    UserModel.findOneAndUpdate({ email }, { lastLogin: Date.now() })
      .then((user) => {
        return Promise.all([user, user ? user.passwordMatch(password) : null]);
      })
      .then(([user, match]) => {
        if (!user || !match) {
          res.status(400).send({ msg: "Password or email don`t match" });
          return;
        }
        const token = tokenCreate({ id: user._id });
        res.cookie(authCookieName, token, { httpOnly: false }).send({
          msg: "Successful login",
          user: { _id: user._id, email: user.email, token },
        });
      })
      .catch(next);
  },
  register: (req, res, next) => {
    const { email, password, rePassword, firstName, lastName } = req.body;
    if (password != rePassword) {
      res.status(400).send({ msg: "Passwords don`t match" });
      return;
    }
    UserModel.create({
      email,
      password,
      firstName,
      lastName,
      role: "User",
      createdOn: Date.now(),
      lastLogin: Date.now(),
    })
      .then((user) => {
        const token = tokenCreate({ id: user._id });
        res.cookie(authCookieName, token, { httpOnly: false }).send({
          msg: "Successful registration",
          user: { _id: user._id, email: user.email, token },
        });
      })
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          res.status(400).send({ msg: "User already taken!" });
          return;
        }
        next(err);
      });
  },
  logout: (req, res, next) => {
    const token = req.cookies[authCookieName];
    RemovedToken.create({ token })
      .then(() => {
        res.clearCookie(authCookieName).send({ msg: "Successfully logout" });
      })
      .catch(next);
  },
};
