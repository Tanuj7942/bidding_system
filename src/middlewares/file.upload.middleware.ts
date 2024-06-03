import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        // ...Do your stuff here.
        callback(null, __dirname + "../../../media");
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        // ...Do your stuff here.
        callback(null, file.originalname);
    }
})

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

export const saveFileToDisk = (file: Express.Multer.File, destination: string) => {
    const filePath = path.join(destination, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
};