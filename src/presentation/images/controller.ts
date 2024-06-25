import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';


export class ImagesController {



  getImage = ( req: Request, res: Response ) => {
    const type = req.params.type ?? '';
    const imgName = req.params.imgName ?? '';

    const imgPath = path.resolve(__dirname, '../../../uploads', `${type}/${ imgName }`);

    if(!fs.existsSync(imgPath)) {
      return res.status(404).send('Image not found');
    }

    res.sendFile(imgPath);
    
  }

}