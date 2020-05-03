module.exports = {
  authorization: (req, res, next) => {
    const { role } = req.decoded;

    if (role === "admin") {
      next();
    } else {
      res.json({
        code: 403,
        message: "Unauthorized",
      });
    }
  },
};
