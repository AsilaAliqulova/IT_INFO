const {
  addUser,
  updateById,
  deleteById,
  getByAll,
  loginUser,
  refreshUserToken,
  logoutUser,
  activateUser,
} = require("../controllers/user.controller");
const userPolice = require("../police_middlewere/user_police");
const adminPolice = require("../police_middlewere/admin_polic");
const admin_self_police = require("../police_middlewere/admin_self_polic");
const user_self_police = require("../police_middlewere/user_self_police");

const router = require("express").Router();

router.post("/create", addUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUserToken);
router.get("/activate/:link", activateUser);
router.get("/all", userPolice, adminPolice, admin_self_police, getByAll);
router.patch(
  "/:id",
  userPolice,
  user_self_police,
  adminPolice,
  admin_self_police,
  updateById
);
router.delete(
  "/:id",
  userPolice,
  user_self_police,
  adminPolice,
  admin_self_police,
  deleteById
);

module.exports = router;
