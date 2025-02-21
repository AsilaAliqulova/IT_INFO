const { errorHandler } = require("../helpers/error_handler");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validations/author.validation");
const bcrypt = require("bcrypt");                                              
// const jwt = require("jsonwebtoken");
const config = require("config");
const authorJwt = require("../services/jwt.servies");
const { to } = require("../helpers/to_promis");
const uuid = require("uuid");``
const mailService = require("../services/mail.service");

const addAuthor = async (req, res) => {
  console.log(123456)
  try {
    // const { error, value } = authorValidation(req.body);
    // if (error) {
    //   return errorHandler(error, res);
    // }
    const data = req.body;
    
    const heshedPassword = bcrypt.hashSync("data.password", 7);

    const activation_link = uuid.v4();
    const newAuthor = await Author.create({
      ...data,
      password: heshedPassword,
      activation_link,
    });

    
    await mailService.sendMAilActivationCode(
      data.email,
      `${config.get("api_url")}/api/author/activate/${activation_link}`
    );

    res.status(201).send({ msg: "New Author added", newAuthor });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(401).send({ msg: "Email yoki parol xato" });
    }
    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res.status(401).send({ msg: "Email yoki parol xato" });
    }

    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
    };
    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenTime"),
    // });

    const tokens = authorJwt.generateToken(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });
    console.log(tokens);

    // try {
    //   setTimeout(function () {
    //     const err = new Error("unCoughtException error");
    //     throw err;
    //   }, 1000);
    // } catch (error) {
    //   console.log(error);
    // }

    // new Promise((_, reject) => {
    //   reject(new Error("unhendledRejection example"));
    // });
    res.status(200).send({ msg: "Tizimga xush kelibsiz",author_id:author._id, accessToken:tokens.accessToken });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log({ refreshToken });
    if (!refreshToken) {
      return res.status(400).send({ msg: "Token topilmadi" });
    }
    const author = await Author.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!author) {
      return res.status(400).send({ msg: "Bunday tokenli avtor yuq" });
    }
    res.clearCookie("refreshToken");

    res.send({ refreshToken: author.refresh_token });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshAuthorToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log({ refreshToken });
    if (!refreshToken) {
      return res.status(400).send({ msg: "Cookei Tokin topilmadi" });
    }
    const [error, tokenFromCookie] = await to(
      authorJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return res.status(401).send({ error: error.message });
    }

    const author = await Author.findOne({ refresh_token: refreshToken });
    if (!author) {
      return res.status(401).send({ error: "Author not found" });
    }
    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
    };
    const tokens = authorJwt.generateToken(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();
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

const getByQuery = async (req, res) => {
  try {
    const { category } = req.query;
    const found = await Author.find({ category });
    if (!found) {
      return res.status(404).send({ msg: "Author not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByAll = async (req, res) => {
  try {
    // const authorization = req.headers.authorization
    // console.log(authorization);

    // if (!authorization ) {
    //   return res.status(401).send({msg:"Avtor ro'yhatdan o'tmagan (token topilmadi)"})
    // }

    // const bearer = authorization.split(" ")[0]
    // const token = authorization.split(" ")[1]

    // if(bearer !== "Bearer" || !token){
    //   return res.status(401).send({msg:"Avtor ro'yhatdan o'tmagan (token berilmagan)"})
    // }
    // const decodedToken = jwt.verify(token , config.get("tokenKey"))
    // console.log(decodedToken);

    const found = await Author.find({});
    if (!found) {
      return res.status(404).send({ msg: "Author not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const found = await Author.findById(id);
    if (!found) {
      return res.status(404).send({ msg: "Author topilmadi." });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByFirsName = async (req, res) => {
  try {
    const fname = req.params.author_first_name;
    const found = await Author.findOne(fname);
    if (!found) {
      return res.status(404).send({ msg: "Author topilmadi." });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByLastName = async (req, res) => {
  try {
    const lastn = req.params.author_last_name;
    const found = await Author.findOne(lastn);
    if (!found) {
      return res.status(404).send({ msg: "Author topilmadi." });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByNick = async (req, res) => {
  try {
    const { author_nick_name } = req.params;
    const found = await Author.findOne({ author_nick_name });
    if (!found) {
      return res.status(404).send({ msg: "Author topilmadi." });
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
    const update = await Author.findByIdAndUpdate(id, data, { new: true });
    if (!update) {
      return res.status(404).send({ msg: "Author topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Author.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "Author topilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateAuthor = async (req, res) => {
  try {
    const link = req.params.link;
    const author = await Author.findOne({ activation_link: link });
    if (!author) {
      return res.status(400).send({ msg: "Bunday avtor topilmadi" });
    }
    if (author.is_active == "true") {
      return res.status(400).send({ msg: "Avtor avval faollashtirilgan" });
    }

    author.is_active = "true";
    await author.save();
    res.send({ msg: "Avtor faollashtirildi", is_active: author.is_active });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
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
};
