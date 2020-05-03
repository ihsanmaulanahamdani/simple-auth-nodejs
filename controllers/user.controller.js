const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const User = require("../models/user.model");

module.exports = {
  signUp: (req, res) => {
    User.create(req.body)
      .then((user) => {
        res.json({
          code: 201,
          message: "Sign up success",
          user,
        });
      })
      .catch((err) => {
        res.json({
          code: 500,
          message: "Opps! Something went wrong",
        });
      });
  },
  logIn: (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (user) {
          const hashed = bcrypt.compareSync(password, user.password);

          if (hashed) {
            const payload = {
              email: user.email,
              role: user.role,
            };

            const token = jwt.sign(payload, secretKey);

            res.json({
              code: 200,
              message: "Log in success",
              token,
            });
          } else {
            res.json({
              code: 403,
              message: "Email or password wrong",
            });
          }
        } else {
          res.json({
            code: 403,
            message: "Email or password wrong",
          });
        }
      })
      .catch((err) => {
        res.json({
          code: 500,
          message: "Opps! Something went wrong",
        });
      });
  },
};
