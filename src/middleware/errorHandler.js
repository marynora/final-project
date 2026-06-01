import * as Sentry from "@sentry/node";

const errorHandler = (error, req, res, next) => {
  Sentry.captureException(error);

  console.error(error);

  res.status(500).json({
    message:
      "An error occurred on the server, please double-check your request!",
  });
};

export default errorHandler;
