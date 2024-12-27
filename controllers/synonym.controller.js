const { errorHandler } = require("../helpers/error_handler");
const Synonym = require("../schemas/Synonym");
const { SynonymValidation } = require("../validations/synonym.validation");

const addSynonym = async (req, res) => {
  try {
    const { error, value } = SynonymValidation(req.body, {
      abortEarly: false,
    });
    if (error) {
      return errorHandler(error, res);
    }

    const data = req.body;
    const oldSynonm = await Synonym.findOne(data);
    if (oldSynonm) {
      console.log(oldSynonm);

      return res.status(400).send({ msg: "This Synonym already exists" });
    }

    const newSynonym = await Synonym.create(data);

    const descId = await Synonym.findById(data.desc_id);

    descId?.desc_id?.push(newSynonym);
    await descId?.save();

    const dictId = await Synonym.findById(data.dict_id);
    dictId?.dict_id?.push(newSynonym);
    await dictId?.save();

    res.status(201).send({ msg: "New Synonym added", newSynonym });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  try {
    const found = await Synonym.find().populate("desc_id").populate("dict_id");
    if (!found) {
      return res.status(404).send({ msg: "Synonym not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getSynonymById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await Synonym.findById(id);
    if (!found) {
      return res.status(500).send({ msg: "Synonym not found" });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getSynonymByQuiry = async (req, res) => {
  try {
    const query = req.query;

    const found = await Synonym.findOne(query);
    if (!found) {
      return res.status(500).send({ msg: "Synonym not found" });
    }
    return res.status(200).send(found);
  } catch (error) {}
};

const updateSynonymById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const update = await Synonym.findByIdAndUpdate(id, data);

    if (!update) {
      return res.status(404).send({ msg: "Synonym topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteSynonymById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Synonym.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Synonym o'chirilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addSynonym,
  getSynonymById,
  getSynonymByQuiry,
  updateSynonymById,
  deleteSynonymById,
  getByAll,
};
