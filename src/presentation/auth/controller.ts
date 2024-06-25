import { Request, Response } from 'express';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../services';
import { CustomError } from '../common';
import { JwtAdapter } from '../../config';


export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private handleError = (error:unknown, res: Response ) => {
    if(error instanceof CustomError ){
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${ error }`);
    return res.status(500).json({error: 'Internal server error'});
  }

  checkStatus = (req: Request, res: Response) => { 
    const user = req.body.user;
    this.authService.checkAuthStatus(user)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res))
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    
    this.authService.loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));

  };
}
