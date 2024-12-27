const config = require("config");
const jwt = require("jsonwebtoken");

class JwtSevice {
  constructor(accessKey, reftershKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.reftershKey = reftershKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }
  generateToken(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });

    const refreshToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.refreshTime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.reftershKey);
  }
}


module.exports = new JwtSevice(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);

