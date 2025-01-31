const path = require("path");
const { version } = require("../package.json");

// EXPRESS REQUIREMENTS
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// DATABASE
const db = require("./db");

// MIDDLEWARES
const {
  errorHandlingMiddleWare,
} = require("./middlewares/errorHandlingMiddleware");
const {
  errorLoggingMiddleWare,
  loggerMiddleWare,
} = require("./middlewares/loggingMiddleware");
const favicon = require("serve-favicon");

// LOGGER
const { logger } = require("./plugins/winston");
const logConfig = require("./utils/logConfig");

// ROUTERS
const { choreoRouter } = require("./routes/choreo");
const { teamRouter } = require("./routes/team");
const { clubRouter } = require("./routes/club");
const { hitRouter } = require("./routes/hit");
const { lineupRouter } = require("./routes/lineup");
const { memberRouter } = require("./routes/member");
const { positionRouter } = require("./routes/position");
const { userRouter } = require("./routes/user");
const { authRouter } = require("./routes/auth");
const { seasonRouter } = require("./routes/season");
const { seasonTeamRouter } = require("./routes/seasonTeam");
const { feedbackRouter } = require("./routes/feedback");

// ADMIN ROUTER
const { adminRouter } = require("./routes/admin");

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(loggerMiddleWare);

app.set("view engine", "ejs");

app.use(
  require("express-status-monitor")({
    title: "Choreo Planer Server",
    path: "/status",
  })
);

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get("/", (req, res) => {
  res.render("../src/views/status", {
    version,
    frontendDomain: process.env.FRONTEND_DOMAIN,
  });
});
app.get("/version", (req, res) => {
  res.send(version);
});
app.get("/health", (req, res, next) => {
  res.status(200).send();
  next();
});

app.use("/choreo", choreoRouter);
app.use("/team", teamRouter);
app.use("/club", clubRouter);
app.use("/hit", hitRouter);
app.use("/lineup", lineupRouter);
app.use("/member", memberRouter);
app.use("/position", positionRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/season", seasonRouter);
app.use("/seasonTeam", seasonTeamRouter);
app.use("/feedback", feedbackRouter);

app.use("/admin", adminRouter);

app.use(errorLoggingMiddleWare);
app.use(errorHandlingMiddleWare);

function startServer() {
  logConfig();

  db.authenticate()
    .then(() => {
      logger.info("DB Connection established");

      app.listen(port, () => {
        logger.info(`App listening on http://localhost:${port}`);
      });
    })
    .catch((e) => {
      logger.error(
        "Unable to authenticate with the database. Restarting in 1 sec"
      );
      setTimeout(startServer, 1000);
    });
}

startServer();
