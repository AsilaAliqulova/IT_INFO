const { errorHandler } = require("../helpers/error_handler");
const Topic = require("../schemas/Topic");
const { TopicValidation } = require("../validations/topic.validation");

const addTopic = async (req, res) => {  
  try {

    const {error,value} =TopicValidation(req.body)
    if (error) {
      return errorHandler(error, res);
    }



    const data = req.body;
    const oldTopic = await Topic.findOne(data);
    if (oldTopic) {
      return res.status(400).send({ msg: "This Topic already exists" });
    }
    const newTopic = await Topic.create( data );

    const topic = await Topic.findById(data.author_id);
    topic?.posts?.push(newTopic);
    await topic?.save();

    res.status(201).send({ msg: "New Topic added", newTopic });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  try {
    const found = await Topic.find().populate("author_id");
    if (!found) {
      return res.status(404).send({ msg: "Topic not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTopicById = async (req, res) => {
  console.log(5346);
  
  try {
    const id = req.params.id;
    const found = await Topic.findById(id);
    if (!found) {
      return res.status(500).send({ msg: "Topic not found" });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTopicByTitle = async (req, res) => {
  try {
    const { topic_title } = req.params.id;
    const found = await Topic.findOne({ topic_title });
    if (!found) {
      return res.status(500).send({ msg: "Topic not found" });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTopicByQuiry = async (req, res) => {
  try {
    const query = req.query;

    const found = await Topic.findOne(query);
    if (!found) {
      return res.status(500).send({ msg: "Topic not found" });
    }
    return res.status(200).send(found);
  } catch (error) {}
};

const updateTopicById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const update = await Topic.findByIdAndUpdate(id, data);

    if (!update) {
      return res.status(404).send({ msg: "Topic topilmadi." });
    }
    return res.status(201).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteTopicById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Topic.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Topic o'chirilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addTopic,
  getTopicById,
  getTopicByQuiry,
  updateTopicById,
  deleteTopicById,
  getTopicByTitle,
  getByAll,
};
