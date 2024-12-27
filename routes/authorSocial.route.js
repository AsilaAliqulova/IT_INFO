const {
  addAuthorSocial,
  getByQuery,
  getById,
  updateById,
  deleteById,
  getAuthorID,
  getByAll,
} = require("../controllers/authorSocial.controller");

const router = require("express").Router();


router.post("/create", addAuthorSocial);
router.get("/query", getByQuery);
router.get("/:id", getById);
router.get("/", getByAll);
router.get("/:authId", getAuthorID);
router.put("/:id",  updateById);
router.delete("/:id", deleteById);

module.exports = router;
