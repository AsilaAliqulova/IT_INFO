const {
  addSocial,
  getByQuery,
  getById,
  updateById,
  deleteById,
  getByName,
  getByAll,
} = require("../controllers/social.controller");

const router = require("express").Router();

router.post("/create", addSocial);
router.get("/query", getByQuery);
router.get("/", getByAll);
router.get("/:id", getById);

router.get("/name/:name", getByName);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
