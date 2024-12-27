const {
  addAdmin,
  getByAll,
  getById,
  updateById,
  deleteById,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/admin.controller");

const router = require("express").Router();
const adminPolice = require("../police_middlewere/admin_polic");
const admin_self_police = require("../police_middlewere/admin_self_polic");


router.post("/create",  addAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/all", adminPolice, admin_self_police, getByAll);
router.get("/:id",adminPolice,admin_self_police, getById);
router.put("/:id", adminPolice, admin_self_police, updateById);
router.delete("/:id", adminPolice, admin_self_police, deleteById);

module.exports = router;
