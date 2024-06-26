import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

interface Options {
  port: number;
  routes: Router
}

export class Server {

  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options ){
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }


  start() {

    // Middlewares
    this.app.use(cors());

    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

    this.app.use(express.json());

    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));

    // Routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

}