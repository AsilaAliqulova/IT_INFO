const { errorHandler } = require("../helpers/error_handler");
const Tag = require("../schemas/Tag");
const { TagValidation } = require("../validations/tag.validation");

const addTag = async (req, res) => {
  console.log(2323);
  
  try {
    const { error, value } = TagValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const term = req.body;
    const oldTag = await Tag.findOne(term);
    if (oldTag) {
      return res.status(400).send({ msg: "This Tag already exists" });
    }
    const newTag = await Tag.create(term);

    const tag = await Tag.findById(term.topic_id);
    tag?.posts.push(newTag);
    await tag.save();
      

    res.status(201).send({ msg: "New Tag added", newTag });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  try {
    const found = await Tag.find({})
      .populate("topic_id")
      .populate("category_id");
    if (!found) {
      return res.status(404).send({ msg: "Tag not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await Tag.findById(id);
    if (!found) {
      return res.status(500).send({ msg: "Tag not found" });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTagByQuiry = async (req, res) => {
  try {
    const query = req.query;

    const found = await Tag.findOne(query);
    if (!found) {
      return res.status(500).send({ msg: "Tag not found" });
    }
    return res.status(200).send(found);
  } catch (error) {}
};

const updateTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const update = await Tag.findByIdAndUpdate(id, data);

    if (!update) {
      return res.status(404).send({ msg: "Tag not found" });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Tag.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Tag deleted." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addTag,
  getTagById,
  getTagByQuiry,
  updateTagById,
  deleteTagById,
  getByAll,
};
