module.exports = async function (req, res, next) {
  try {
    const id = req.params.id
    console.log(req.admin.id ,req.admin.superAdmin);
    console.log(req.params.id);
    
    
    if (id !== req.admin.id && !req.admin.superAdmin) {
      return res.status(403).send({ msg: "Sizda bunday huquq yo'q" });
    }
  next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ msg: error.message });
  }
};
