const express = require("express");
const route = express.Router();

const OutBoundCall = require("../controllers/OutboundCall/call.controller");

route.post("/call", OutBoundCall.initiateCall);

module.exports = route;
