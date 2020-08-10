const { CategoryModel } = require("../models");

module.exports = {
  createCategory: (req, res, next) => {
    const category = req.body;

    const { title } = category;

    if (!title) {
      return res.status(400).send({ msg: "Invalid body!" });
    }

    CategoryModel.create({ ...category })
      .then((category) => {
        Promise.all([category]);
      })
      .then(() => {
        res.status(201).send({ msg: "Successfully created category!" });
      })
      .catch(next);
  },
  getAllCategories: (req, res, next) => {
    CategoryModel.find({})
      .then((categories) => {
        res.json(categories);
      })
      .catch(next);
  },
  getCategory: (req, res, next) => {
    const { id } = req.params;
    CategoryModel.find({ _id: id })
      .then((currentCategory) => {
        res.status(200).json(currentCategory);
      })
      .catch(next);
  },
  editCategory: (req, res, next) => {
    const { id } = req.params;
    const category = req.body;
    CategoryModel.updateOne({ _id: id }, { ...category })
      .then((data) => {
        res.send({ msg: "Successfully updated category!", data });
      })
      .catch(next);
  },
};
