import type { Request, Response } from 'express';
import { CustomError } from '../common';
import { FileUploadService } from '../services/file-upload.service';
import type { UploadedFile } from 'express-fileupload';

export class FileUploadController {

  // DI
  constructor(
    private fileUploadService: FileUploadService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  uploadFile = ( req: Request, res: Response ) => {
    const type = req.params.type;
    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadService.uploadSingle({ file, folder: `uploads/${ type }` })
        .then((upload) => res.json(upload))
        .catch((error) => this.handleError(error, res))
  }
  

}