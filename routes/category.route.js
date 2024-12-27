const {
  addCategory,
  getByQuery,
  getById,
  updateById,
  deleteById,
  getByName,
  getByAll,
} = require("../controllers/category.controller");


const router = require("express").Router();

router.post("/create", addCategory);
router.get("/all", getByAll);
router.get("/query", getByQuery);
router.get("/:name", getByName);
router.get("/:id", getById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
