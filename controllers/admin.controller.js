const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../schemas/Admin");
const { adminValidation } = require("../validations/admin.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const adminJwt = require("../services/jwt.servies");
const { to } = require("../helpers/to_promis");

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const data = req.body;

    const heshedPassword = bcrypt.hashSync("data.password", 7);

    const newAdmin = await Admin.create({
      ...value,
      password: heshedPassword,
    });

    res.status(201).send({ msg: "New Admin added", newAdmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).send({ msg: "Email yoki parol xato" });
    }
    const validPassword = bcrypt.compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(401).send({ msg: "Email yoki parol xato" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      superAdmin: admin.is_superAdmin,
    };
    req.admin = payload
    const tokens = adminJwt.generateToken(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });

    res.status(200).send({ msg: "Tizimga xush kelibsiz", ...tokens });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log({ refreshToken });

    if (!refreshToken) {
      return res.status(400).send({ msg: "Token topilmadi" });
    }

    const admin = await Admin.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refres_token: "" },
      { new: true }
    );
    if (!admin) {
      return res.status(400).send({ msg: "Bunday tokenli admin yo'q" });
    }
    res.clearCookie("refreshToken");
    res.send({ refreshToken: admin.refresh_token });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(400).send({ msg: "Cookei Token topilmadi" });
    }
    const [error, tokenFromCookie] = await to(
      adminJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return res.status(401).send({ msg: "Admin topilmadi" });
    }
    const admin = await Admin.findOne({ refresh_token: refreshToken });
    if (!admin) {
      return res.status(401).send({ error: "Admin not found" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
    };
    const tokens = adminJwt.generateToken(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });
    console.log(tokens);

    res.status(200).send({ msg: "Tizimga xush kelibsiz", ...tokens });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  try {
    const found = await Admin.find({});
    if (!found) {
      return res.status(404).send({ msg: "Admin not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const found = await Admin.findById(id);
    if (!found) {
      return res.status(404).send({ msg: "Admin topilmadi." });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await Admin.findByIdAndUpdate(id, data, { new: true });
    if (!update) {
      return res.status(404).send({ msg: "Admin topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "Admin topilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addAdmin,
  getByAll,
  getById,
  updateById,
  deleteById,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
};
