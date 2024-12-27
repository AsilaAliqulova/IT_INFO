module.exports = async function (req, res, next) {
  try {
    console.log(req.admin);
    
    if (!req.admin.superAdmin) {
      return res.status(403).send({ msg: "Sizda bunday huquq yo'q" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ msg: error.message });
  }
};
