const { errorHandler } = require("../helpers/error_handler");
const Social = require("../schemas/Social");
const { SocialValidation } = require("../validations/social.validation");

const addSocial = async (req, res) => {
  console.log(212);
  
  try {

    const { error, value } = SocialValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const data = req.body;
    const newSocial = await Social.create(data);

    res.status(201).send({ msg: "New Social added", newSocial });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  try {
    const found = await Social.find();
    if (!found) {
      return res.status(404).send({ msg: "Social not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByQuery = async (req, res) => {
  try {
    const { social } = req.query;
    const found = await Social.findOne({ social });
    if (!found) {
      return res.status(404).send({ msg: "Social not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await Social.findById(id);

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByName = async (req, res) => {
  try {
    const { social_name } = req.params;
    const found = await Social.findById({ social_name });

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await Social.findByIdAndUpdate(id, data);
    if (!update) {
      return res.status(404).send({ msg: "Social topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Social.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "Social o'chirilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addSocial,
  getByQuery,
  getById,
  updateById,
  deleteById,
  getByName,
  getByAll,
};
