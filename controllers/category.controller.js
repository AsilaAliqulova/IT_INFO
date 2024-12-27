const { errorHandler } = require("../helpers/error_handler");
const Category = require("../schemas/Category");
const Joi = require("joi");
const { categoryValidation } = require("../validations/category.validation");

const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body, {
      abortEarly: false,
    });
    if (error) {
      return errorHandler(error, res);
    }

    const data = req.body;
    const newCategoy = await Category.create(data);

    res.status(201).send({ msg: "New Category added", newCategoy });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByQuery = async (req, res) => {
  try {
    const { catigory } = req.query;
    const found = await Category.findOne({ catigory });
    if (!found) {
      return res.status(404).send({ msg: "Category not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await Category.findOne({ _id: id });

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByName = async (req, res) => {
  try {
    const { category_name } = req.params;
    const found = await Category.findById({ category_name });

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!update) {
      return res.status(404).send({ msg: "Category topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "Category o'chirilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  try {
    const found = await Category.find();
    if (!found) {
      return res.status(404).send({ msg: "Category not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCategory,
  getByQuery,
  getById,
  updateById,
  deleteById,
  getByName,
  getByAll,
};
