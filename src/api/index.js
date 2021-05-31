const guard = require("express-jwt-permissions")();
const { Router } = require("express");
const accounts = require("./accounts");
const dashboard = require("./dashboard");
const checkJwt = require("../services/auth0");

const router = new Router();

router.use("/accounts", checkJwt, guard.check("isAdmin"), accounts);
router.use("/dashboard", checkJwt, guard.check("isAdmin"), dashboard);
router.get("/", (req, res) => {
  return res.json({ version: "1.0.0" });
});

// Error handler
router.use((error, req, res) => {
  return res.status(500).json({ error: error.toString() });
});

module.exports = router;
