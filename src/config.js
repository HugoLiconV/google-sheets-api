/* eslint-disable no-unused-vars */
const path = require("path");
const merge = require("lodash.merge");
const dayjs = require("dayjs");
require("dayjs/locale/es");
dayjs.locale("es"); // use loaded locale globally

/* istanbul ignore next */
const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  dotenv.config({
    path: path.join(__dirname, "../.env"),
    sample: path.join(__dirname, "../.env.example")
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 8080,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "",
    origin: requireProcessEnv("ORIGIN"),
    googleClientEmail: requireProcessEnv("GOOGLE_CLIENT_EMAIL"),
    googlePrivateKey: requireProcessEnv("GOOGLE_PRIVATE_KEY"),
    googleSheetId: requireProcessEnv("GOOGLE_SHEET_ID"),
    authAudience: requireProcessEnv("AUTH0_AUDIENCE"),
    authDomain: requireProcessEnv("AUTH0_DOMAIN"),
    dateFormat: "YYYY-MM-DD",
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
  },
};

module.exports = merge(config.all, config[config.all.env]);
