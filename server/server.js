const app = require("./index");
const http = require("http");
// const config = require("config");
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("App started", PORT);
});

module.exports = server;
