const { getByAll } = require("../controllers/authorSocial.controller");
const {
  addDescTopic,
  getByQuery,
  getById,
  updateById,
  deleteById,
} = require("../controllers/descTopic.controller");

const router = require("express").Router();

router.post("/create", addDescTopic);
router.get("/query", getByQuery);
router.get("/",getByAll)
router.get("/:id", getById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
