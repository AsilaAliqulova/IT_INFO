const {
  addDesc,
  getDescByQuery,
  getById,
  updateDescById,
  deleteDescById,
  getByAll,
} = require("../controllers/desc.controller");


const router = require("express").Router();

router.post("/create", addDesc);
router.get("/query", getDescByQuery);
router.get("/", getByAll);
router.get("/:id", getById);
router.put("/:id", updateDescById);
router.delete("/:id",  deleteDescById);

module.exports = router;
