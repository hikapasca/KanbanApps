const { User } = require("../models");
const { decodePassword } = require("../helpers/bcrypt");
const { jwtSignIn } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const newUser = {
        email: req.body.email,
        password: req.body.password,
        organization: "Hacktiv8",
      };
      const register = await User.create(newUser);
      return res
        .status(201)
        .json({ message: `Success add new user with email ${newUser.email}` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const checkEmail = await User.findOne({ where: { email: email } });
      if (!checkEmail) {
        throw { name: "email/password wrong" };
      } else {
        const checkPassword = decodePassword(password, checkEmail.password);
        if (!checkPassword) {
          throw { name: "email/password wrong" };
        } else {
          const encodeJWT = {
            id: checkEmail.id,
            email: checkEmail.email,
            organization: checkEmail.organization,
          };

          const access_token = jwtSignIn(encodeJWT);
          return res
            .status(200)
            .json({ access_token: access_token, userEmail: checkEmail.email });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async googleSignIn(req, res, next) {
    // CLIENT_ID
    // 603798192515-glvgho7s38d1a6jakuh0558rve9kgj17.apps.googleusercontent.com
    console.log("first step");
    const id_token = req.body.id_token;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    console.log("asdas");
    try {
      console.log("second step");
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];

      const checkEmail = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!checkEmail) {
        console.log("third step");
        const newData = {
          email: payload.email,
          password: "apapa",
          organization: "Hacktiv8",
        };
        console.log(newData, "ini databaru <===========");
        const newUser = await User.create(newData);
        const checkUser = await User.findOne({
          where: { email: payload.email },
        });
        const encodeJWT = {
          id: checkUser.id,
          email: checkUser.email,
          organization: checkUser.organization,
        };

        const access_token = jwtSignIn(encodeJWT);
        return res
          .status(200)
          .json({ access_token: access_token, userEmail: checkUser.email });
      } else {
        console.log("fourth step");
        const sendData = {
          id: checkEmail.id,
          email: payload.email,
        };
        const token = jwtSignIn(sendData);
        return res.status(200).json({ access_token: token });
      }
    } catch (err) {
      console.log("error google login");
      next(err);
    }
  }
}

module.exports = UserController;
