const { Router } = require("express");
const accounts = require("./accounts");
const dashboard = require("./dashboard");
const records = require("./records");
const monthlyExpenses = require("./monthly-expenses");
const dailyExpenses = require("./daily-expenses");
// const guard = require("express-jwt-permissions")();
// const checkJwt = require("../services/auth0");

const router = new Router();

router.use("/accounts", accounts);
router.use("/dashboard", dashboard);
router.use("/records", records);
router.use("/monthly-expenses", monthlyExpenses);
router.use("/daily-expenses", dailyExpenses);
router.get("/", (req, res) => {
  return res.json({ version: "1.0.0" });
});

// Error handler
router.use((error, req, res) => {
  if (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
