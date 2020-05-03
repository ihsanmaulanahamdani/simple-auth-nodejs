const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const secretKey = process.env.SECRET_KEY;

module.exports = {
  authentication: (req, res, next) => {
    const token = req.headers.token;
    
    if (token) {
      const decoded = jwt.verify(token, secretKey);

      User.findOne({ email: decoded.email }).then((user) => {
        if (user) {
          req.decoded = decoded;

          next();
        } else {
          res.json({
            code: 403,
            message: "Unauthenticated",
          });
        }
      });
    } else {
      res.json({
        code: 403,
        message: "Unauthenticated",
      });
    }
  },
};
