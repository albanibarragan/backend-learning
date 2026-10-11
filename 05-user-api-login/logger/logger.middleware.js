import { formatLog, writeLogToFile } from "./logger.js";

const getLogLevel = (statusCode) => {
  if (statusCode >= 500 && statusCode < 600) return "ERROR";
  if (statusCode >= 400 && statusCode < 500) return "WARN";
  return "INFO";
};

export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  res.once("finish", () => {
    const duration = Date.now() - startTime;
    const timestamp = new Date().toISOString();
    const level = getLogLevel(res.statusCode);
    const logMessage = formatLog(req.method, req.originalUrl, res.statusCode, duration, timestamp, level);
    void writeLogToFile(logMessage).catch((error) => {
      console.error("Failed to write request log:", error);
    });
  });
  next();
};