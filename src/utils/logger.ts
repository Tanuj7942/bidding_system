import { createLogger, transports, format } from 'winston';
import dotenvSafe from 'dotenv-safe';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file'

let fileName = '.env';
if (process.env.NODE_ENV === 'test') {
    fileName = '.env.test';
}

dotenvSafe.config({
    allowEmptyValues: true,
    path: path.join(__dirname, `../../../${fileName}`),
});

// tslint:disable-next-line:no-console
console.log(
    `Setting log level to:  ${process.env.LOG_LEVEL !== undefined ? process.env.LOG_LEVEL : 'info'
    }`
);

export const logger = createLogger({
    level: process.env.LOG_LEVEL !== undefined ? process.env.LOG_LEVEL : 'info',
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            dirname: process.env.LOG_PATH,
            filename: 'log-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '1m'
        }),
    ],
    format: format.combine(
        format.errors({
            stack: true
        }),
        format.timestamp(),
        format.json(),
        format.prettyPrint(),
    )
});
