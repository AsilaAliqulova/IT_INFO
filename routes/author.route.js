const {
  addAuthor,
  getByQuery,
  getById,
  updateById,
  deleteById,
  getByFirsName,
  getByLastName,
  getByNick,
  getByAll,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  activateAuthor,
} = require("../controllers/author.controller");
const authorPolice = require("../police_middlewere/author_police");
const authorSelfPolice = require("../police_middlewere/author_self_police");

const adminPolice = require("../police_middlewere/admin_polic");
const admin_self_police = require("../police_middlewere/admin_self_polic");

const router = require("express").Router();

router.post("/", addAuthor);
router.post("/login", loginAuthor);
router.post("/logout", logoutAuthor);
router.post("/refresh", refreshAuthorToken);
router.get("/",  getByAll);
router.get("/activate/:link", activateAuthor);
router.get(
  "/:id",
  authorPolice,
  authorSelfPolice,
  adminPolice,
  admin_self_police,
  getById
);
router.get("/query", getByQuery);
router.get("/:firstn", getByFirsName);
router.get("/:lastn", getByLastName);
router.get("/:nick", getByNick);
router.put(
  "/:id",
  authorPolice,
  authorSelfPolice,
  adminPolice,
  admin_self_police,
  updateById
);
router.delete(
  "/:id",
  authorPolice,
  authorSelfPolice,
  adminPolice,
  admin_self_police,
  deleteById
);

module.exports = router;
