const {
  
  // getOne,
  getTermByQuery,
  getById,
  getLetter,
  updateTermById,
  deleteTermById,
  addDict,
  getByAll
} = require("../controllers/dict.controller");

const router = require("express").Router();


router.post("/", addDict);
router.get("/", getByAll);

// router.post("/term", getOne);
router.get("/termquery", getTermByQuery);
router.get("/:id", getById);
router.get("/letter", getLetter);
router.put("/:id",  updateTermById);
router.delete("/:id",  deleteTermById);

module.exports = router;
