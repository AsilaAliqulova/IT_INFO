const { to } = require("../helpers/to_promis");
const adminJwt = require("../services/jwt.servies");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).send({ msg: "Not registered (token not found)" });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ msg: "Not registered (token not found)" });
    }
    const [error, decodedToken] = await to(adminJwt.verifyAccessToken(token));
    if (error) {
      return res.status(403).send({ msg: error.message });
    }
    console.log(decodedToken);
    req.admin = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send({ msg: error.message });
  }
};
