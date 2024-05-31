import express, { Router } from 'express';

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
    this.app.use(express.json());

    // Routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

}