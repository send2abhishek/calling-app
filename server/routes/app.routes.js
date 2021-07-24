const express = require("express");
const route = express.Router();

const callRequestValidator = require("../middlewares/validateCallRequets");
const OutBoundCall = require("../controllers/OutboundCall/call.controller");

route.post(
  "/call/connect",
  callRequestValidator.validateCallConnectRequest,
  OutBoundCall.connectCall
);

route.post(
  "/call/disconnect",
  callRequestValidator.validateCallDisConnectRequest,
  OutBoundCall.disconnectCall
);

module.exports = route;
