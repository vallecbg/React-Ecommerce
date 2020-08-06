const mongoose = require("mongoose");
const { String, ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: ObjectId,
      ref: "Order",
    },
  ],
  role: {
    type: String,
    default: "User",
  },
  createdOn: {
    type: Date,
    required: true,
  },
  lastLogin: {
    type: Date,
    required: true,
  },
});

userSchema.methods = {
  passwordMatch: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
          return;
        }
        this.password = hash;
        next();
      });
    });
  }
});

module.exports = mongoose.model("User", userSchema);
