const {
  addTopic,
  getTopicById,
  getTopicByQuiry,
  updateTopicById,
  deleteTopicById,
  getTopicByTitle,
  getByAll,
} = require("../controllers/topic.controller");

const router = require("express").Router();


router.post("/create", addTopic);
router.get("/:id", getTopicById);
router.get("/",getByAll)
router.get("/:title", getTopicByTitle);
router.get("/query", getTopicByQuiry);
router.put("/:id",  updateTopicById);
router.delete("/:id",  deleteTopicById);

module.exports = router;
