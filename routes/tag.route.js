const {
  addTag,
  getTagById,
  getTagByQuiry,
  updateTagById,
  deleteTagById,
  getByAll
} = require("../controllers/tag.controller");

const router = require("express").Router();

router.post("/create", addTag);
router.get("/synonymquery", getTagById);
router.get("/",getByAll)
router.get("/:id", getTagByQuiry);
router.put("/:id", updateTagById);
router.delete("/:id", deleteTagById);

module.exports = router;
