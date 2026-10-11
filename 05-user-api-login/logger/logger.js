import { appendFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const loggerDirectory = dirname(fileURLToPath(import.meta.url));
const logsDirectory = join(loggerDirectory, "..", "logs");
const logFilePath = join(logsDirectory, "logs.txt");

export const formatLog = (method, url, statusCode, duration, timestamp, level = "INFO") => {
  return `[${timestamp}] [${level}] ${method} ${url} ${statusCode} ${duration}ms`;
};

export const writeLogToFile = async (logMessage) => {
  await mkdir(logsDirectory, { recursive: true });
  await appendFile(logFilePath, `${logMessage}\n`, "utf8");
};