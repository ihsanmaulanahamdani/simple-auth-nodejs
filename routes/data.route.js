const router = require("express").Router();

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

router.use(authentication);
router.get("/", (req, res) => {
  res.send("Data berhasil diakses");
});
router.use(authorization);
router.get("/admin", (req, res) => {
  res.send("Data berhasil diakses oleh admin");
});

module.exports = router;
