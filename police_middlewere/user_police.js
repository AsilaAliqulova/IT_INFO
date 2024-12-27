const userJwt = require("../services/jwt.servies");
const { to } = require("../helpers/to_promis");

module.exports = async function (req, res, next) {
  if (req.method == "GET") {
    try {
      const authorization = req.headers.authorization;
      console.log(authorization);
      if (!authorization) {
        return res.status(403).send({ msg: "User ro'yhatdan o'tmagan" });
      }
      const bearer = authorization.split(" ")[0];
      const token = authorization.split(" ")[1];
      if (bearer !== "Bearer" || !token) {
        return res.status(403).send({ msg: "User ro'yxatdan o'tmagan" });
      }
      const [error, decodedToken] = await to(userJwt.verifyAccessToken(token));
      if (error) {
        return res.status(403).send({ msg: error.message });
      }
      console.log(decodedToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).send({ msg: error.message });
    }
  }
};
