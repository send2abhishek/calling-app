const express = require("express");
const route = express.Router();

const OutBoundCall = require("../controllers/OutboundCall/call.controller");

route.post("/call/connect", OutBoundCall.connectCall);
route.post("/call/disconnect", OutBoundCall.disconnectCall);

module.exports = route;
