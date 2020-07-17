const { jwtVerify } = require("../helpers/jwt");
const { User, Task } = require("../models");
const authentication = async function (req, res, next) {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "token not found" };
    } else {
      const checkData = jwtVerify(access_token);
      const verify = await User.findOne({ where: { email: checkData.email } });
      req.idUser = verify.id;

      next();
    }
  } catch (err) {}
};

const authorization = async function (req, res, next) {
  try {
    const getId = Number(req.params.id);
    const checkData = await Task.findOne({ where: { id: getId } });
    console.log(checkData.UserId, req.idUser);
    if (!checkData) {
      throw { name: "task not found" };
    } else {
      if (checkData.UserId !== req.idUser) {
        throw { name: "forbidden access" };
      } else {
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication, authorization };
