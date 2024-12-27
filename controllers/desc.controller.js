const { errorHandler } = require("../helpers/error_handler");
const Description = require("../schemas/Description");
const { descValidation } = require("../validations/desc.validation");

const addDesc = async (req, res) => {
  
  try {


    const { error, value } = descValidation(req.body, {
      abortEarly: false,
    });
    if (error) {
      return errorHandler(error, res);
    }

    
    const data  = req.body;
    const newDesc = await Description.create(data)

    const categoryId = await Description.findById(data.category_id);
    categoryId?.category_id?.push(newDesc);
    await categoryId?.save();

    res.status(201).send({ msg: "New Description added", newDesc });
  } catch (error) {
    errorHandler(error, res);
  }
};


const getByAll = async (req, res) => {
  try {
    const found = await Description.find({}).populate("category_id");
    if (!found) {
      return res.status(404).send({ msg: " not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};




const getDescByQuery = async (req, res) => {
  try {
    const { desc } = req.query;
    const found = await Description.findOne({ desc });
    if (!found) {
      return res.status(404).send({ msg: "Description not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await Description.findById(id);

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};


const updateDescById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await Description.findByIdAndUpdate(id, data);
    if (!update) {
      return res.status(404).send({ msg: "Description topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteDescById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Description.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "Description o'chirilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};




module.exports = {
  addDesc,
  getDescByQuery,
  getById,
  updateDescById,
  deleteDescById,
  getByAll,
};
