import express from "express";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import logMiddleware from "./middleware/logMiddleware.js";
import * as Sentry from "@sentry/node";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

app.use(express.json());
app.use(logMiddleware);

app.use("/login", loginRouter);
app.use("/properties", propertiesRouter);
app.use("/hosts", hostsRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
