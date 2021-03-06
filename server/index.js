const express = require("express");
const appRoutes = require("./routes/app.routes");
const app = express();

require("dotenv").config();
const { sequelize } = require("./database/dbConnection");

// cors enable
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync({})
    .then(() => {
      console.log("Tables synched!");
    })
    .catch((err) => {
      console.log(err);
    });
}

sequelize
  .authenticate()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error("error in db connection", err);
  });

app.get("/", (req, res) => {
  res.send("App has started...");
});

//Middelware for enabling read json body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json({}));

//Application routes
app.use("/api", appRoutes);

//for unknown routes
app.use((req, res, next) => {
  const error = new Error("Page Not found");
  error.status = 404;
  next(error);
});

// Error Handler for express
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
