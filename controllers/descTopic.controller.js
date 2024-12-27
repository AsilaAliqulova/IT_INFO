const { errorHandler } = require("../helpers/error_handler");
const DescTopic = require("../schemas/DescTopic");
const { descTopicValidation } = require("../validations/descTopic.validation");

const addDescTopic = async (req, res) => {
  try {
    
    const { error, value } = descTopicValidation(req.body, {
      abortEarly: false,
    });
    if (error) {
      return errorHandler(error, res);
    }


    const  data  = req.body;
    
    const newDescTopic = await DescTopic.create(data)

    const descId = await DescTopic.findById(data.desc_id);
    descId?.desc_id?.push(newDescTopic);
    await descId?.save();

    const TopicId = await DescTopic.findById(data.topic_id);
    TopicId?.topic_id?.push(newDescTopic);
    await TopicId?.save();

    res.status(201).send({ msg: "New DescTopic added", newDescTopic });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {  
  try {
    const found = await DescTopic.find({})
      .populate("desc_id")
      .populate("topic_id");
    if (!found) {
      return res.status(404).send({ msg: "DescTopic not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};


const getByQuery = async (req, res) => {
  try {
    const { data } = req.query;
    const found = await DescTopic.findOne({ data });
    if (!found) {
      return res.status(404).send({ msg: "DescTopic not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await DescTopic.findById(id);

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  } u
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await DescTopic.findByIdAndUpdate(id, data);
    if (!update) {
      return res.status(404).send({ msg: "DescTopic topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await DescTopic.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "DescTopic o'chirilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};




module.exports = {
  addDescTopic,
  getByQuery,
  getById,
  updateById,
  deleteById,
  getByAll
};
