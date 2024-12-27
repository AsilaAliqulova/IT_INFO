const { errorHandler } = require("../helpers/error_handler");
const User = require("../schemas/User");
const bcrypt = require("bcrypt");
const { userValidation } = require("../validations/user.validation");
const userJwt = require("../services/jwt.servies");
const { to } = require("../helpers/to_promis");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/mail.service");


const addUser = async (req, res) => {
  console.log(123);
  
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const data = req.body;

    const heshedPassword = bcrypt.hashSync(data.password, 7);
    const activation_link = uuid.v4()
    const newUser = await User.create({
      ...data,
      password: heshedPassword,
      activation_link,
    });

    await mailService.sendMAilActivationCode(
      value.email,
      `${config.get("api_url")}/api/user/activate/${activation_link}`
    )

    res.status(201).send({ msg: "New User added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ msg: "Email yoki parol xato" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ msg: "Email yoki parol xato" });
    }

    const payload = {
      id: user.id,
      name: user.name,
      isActive: user.is_active,
    };

    const tokens = userJwt.generateToken(payload)
    user.refresh_token = tokens.refreshToken;
    await user.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });
    console.log(tokens);
    
    res.status(200).send({ msg: "Tizimga xush kelibsiz",...tokens });
  } catch (error) {
    errorHandler(error, res);
  }
};


const logoutUser = async (req,res)=>{
  try {
    const { refreshToken } = req.cookies;
    console.log({ refreshToken });
    if (!refreshToken) {
      return res.status(400).send({ msg: "Tokin topilmadi" });
    }
    const user = await User.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({ msg: "Bunday tokenli avtor yuq" });
    }
    res.clearCookie("refreshToken");
    res.send({ refreshToken: user.refresh_token });
  } catch (error) {
    errorHandler(error, res);
  }
}

const refreshUserToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log({ refreshToken });
    if (!refreshToken) {
      return res.status(400).send({ msg: "Cookei Tokin topilmadi" });
    }
    const [error, tokenFromCookie] = await to(
      userJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return res.status(401).send({ error: error.message });
    }

    const user = await User.findOne({ refresh_token: refreshToken });
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    const payload = {
      id: user._id,
      email: user.email,
    };
    const tokens = userJwt.generateToken(payload);
    user.refresh_token = tokens.refreshToken;
    await user.save();
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
    const found = await User.find();
    if (!found) {
      return res.status(404).send({ msg: "User not found" });
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
    const update = await User.findByIdAndUpdate(id, data, { new: true });
    if (!update) {
      return res.status(404).send({ msg: "User topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "User topilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};


const activateUser = async (req, res) => {
  try {
    const link = req.params.link;
    const user = await User.findOne({ activation_link: link });
    if (!user) {
      return res.status(400).send({ msg: "Bunday user topilmadi" });
    }
    if (user.is_active == "true") {
      return res.status(400).send({ msg: "User avval faollashtirilgan" });
    }

    user.is_active = "true";
    await user.save();
    res.send({ msg: "User faollashtirildi", is_active: user.is_active });
  } catch (error) {
    errorHandler(error, res);
  }
};


module.exports = {
  addUser,
  updateById,
  deleteById,
  getByAll,
  loginUser,
  logoutUser,
  refreshUserToken,
  activateUser,
};
