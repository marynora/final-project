import logger from "../utils/log.js";

const logMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info(
      `${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${duration}ms`,
    );
  });

  next();
};

export default logMiddleware;
