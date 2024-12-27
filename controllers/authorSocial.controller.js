const { errorHandler } = require("../helpers/error_handler");
const AuthorSocial = require("../schemas/AuthorSocial");
const { authorSocialValidation } = require("../validations/authorSocial.validation");

const addAuthorSocial = async (req, res) => {  
  try {

    const { error, value } = authorSocialValidation(req.body, {
      abortEarly: false,
    });
    if (error) {
      return errorHandler(error, res);
    }



    const  data  = req.body;
    const newAuthorSocial = await AuthorSocial.create(data)

    const socialId = await AuthorSocial.findById(data.social_id);
    socialId?.social_id?.push(newAuthorSocial);
    await socialId?.save();

    const authorId = await AuthorSocial.findById(data.author_id);
    authorId?.author_id?.push(newAuthorSocial);
    await authorId?.save();

    res.status(201).send({ msg: "New AuthorSocial added", newAuthorSocial });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  
  try {
    const found = await AuthorSocial.find({})
      .populate("author_id")
      .populate("social_id");;
    if (!found) {
      return res.status(404).send({ msg: " not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByQuery = async (req, res) => {
  try {
    const { data } = req.query;
    const found = await AuthorSocial.findOne({ data });
    if (!found) {
      return res.status(404).send({ msg: "AuthorSocial not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await AuthorSocial.findById(id);
    if (!found) {
      return res.status(404).send({ msg: "AuthorSocial topilmadi." });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};


const getAuthorID = async (req, res) => {
  try {
    const authorId = req.params.author_id;
    const found = await AuthorSocial.findOne(authorId );
    if (!found) {
      return res.status(404).send({ msg: "topilmadi." });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};



const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await AuthorSocial.findByIdAndUpdate(id, data);
    if (!update) {
      return res.status(404).send({ msg: "AuthorSocial topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await AuthorSocial.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "AuthorSocial topilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addAuthorSocial,
  getByQuery,
  getById,
  updateById,
  deleteById,
  getAuthorID,
  getByAll,
};
