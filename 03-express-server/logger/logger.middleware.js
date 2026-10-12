import { formatLog, writeLogToFile } from './logger.js';

const getLogLevel = statusCode => {
  if (statusCode >= 500) return 'ERROR';
  if (statusCode >= 400) return 'WARN';
  return 'INFO';
};

export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.once('finish', () => {
    const logMessage = formatLog(
      req.method,
      req.originalUrl,
      res.statusCode,
      Date.now() - startTime,
      new Date().toISOString(),
      getLogLevel(res.statusCode)
    );

    void writeLogToFile(logMessage).catch(error => {
      console.error('Failed to write request log:', error);
    });
  });

  next();
};
