import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid'
import type { UploadedFile } from 'express-fileupload';
import { CustomError } from '../common';

interface UploadOptions {
  file: UploadedFile;
  folder?: string;
  validExtensions?: string[]
}

export class FileUploadService {


  private checkFolder( folderPath: string ) {
    if ( !fs.existsSync(folderPath) ) {
      fs.mkdirSync(folderPath);
    }
  }


  async uploadSingle ({ file, folder = 'uploads', validExtensions = ['png', 'gif', 'jpg', 'jpeg']}: UploadOptions) {

    try {
      
      // validar extension
      const fileExtension = file.mimetype.split('/').at(1) ?? '';
      if( !validExtensions.includes(fileExtension )) {
        throw CustomError.badRequest(`Invalid extension: ${ validExtensions }`);
      }

      const destination = path.resolve(__dirname, '../../../', folder);
      this.checkFolder(destination);

      const fileName = `${ uuid() }.${ fileExtension }`;

     file.mv(`${destination}/${fileName}`);
     
     return { fileName };


    } catch (error) {
      // console.log({error});
      throw error;
    }


  }

}