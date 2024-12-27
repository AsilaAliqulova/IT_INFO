const { errorHandler } = require("../helpers/error_handler");
const Dictionary = require("../schemas/Dictionary");
const { dictValidation } = require("../validations/dict.validation");

const addDict = async (req, res) => {
  try {
    const { error, value } = dictValidation(req.body, {
      abortEarly: false,
    });
    if (error) {
      return errorHandler(error, res);
    }

    const newTerm = await Dictionary.create(req.body);

    res.status(201).send({ msg: "New term added", newTerm });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  try {
    const found = await Dictionary.find({});
    if (!found) {
      return res.status(404).send({ msg: "Dictionary not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { term } = req.params.term;
    const dict = await Dictionary.findOne(term);

    return res.status(200).send(dict);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTermByQuery = async (req, res) => {
  try {
    const { term } = req.query;
    const found = await Dictionary.findOne({ term });
    if (!found) {
      return res.status(404).send({ message: "Termin topilmadi." });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await Dictionary.findById(id);

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getLetter = async (req, res) => {
  try {
    const found = await Dictionary.find({});
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateTermById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await Dictionary.findByIdAndUpdate(id, data);
    if (!update) {
      return res.status(404).send({ message: "Term topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteTermById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Dictionary.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Term o'chirilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  // getOne,
  getTermByQuery,
  getById,
  getLetter,
  updateTermById,
  deleteTermById,
  getByAll,
  addDict,
};
