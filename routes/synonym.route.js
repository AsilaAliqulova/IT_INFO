const {
  addSynonym,
  getSynonymById,
  getSynonymByQuiry,
  updateSynonymById,
  deleteSynonymById,
  getByAll,
} = require("../controllers/synonym.controller");

const router = require("express").Router();

router.post("/create", addSynonym);
router.get("/synonymquery", getSynonymByQuiry);
router.get("/:id", getSynonymById);
router.get("/",getByAll)
router.put("/:id", updateSynonymById);
router.delete("/:id", deleteSynonymById);

module.exports = router;
