import { PrismaClient } from '@prisma/client';

import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { BcryptAdapter, CustomError, JwtAdapter } from '../../config';

export class AuthService {
  private readonly prisma = new PrismaClient();

  // DI
  constructor() {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, firstName, lastName, password } = registerUserDto;
    try {
      const exists = await this.prisma.user.findUnique({
        where: { email },
      });

      if (exists) {
        throw CustomError.badRequest('Email already exist');
      }

      const user = await this.prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: BcryptAdapter.hash(password),
        },
      });

      const token = await JwtAdapter.generateToken({ id: user.id });
      if( !token ) {
        throw CustomError.badRequest('Error while creating token');
      }

      const { password: _, ...rest } = user;

      return {
        user: rest,
        token: token
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw CustomError.badRequest('Email not exists');
      }

      const isMatching = BcryptAdapter.compare(password, user.password);

      if (!isMatching) {
        throw CustomError.badRequest('Password is not valid');
      }

      const token = await JwtAdapter.generateToken({ id: user.id });
      if( !token ) {
        throw CustomError.badRequest('Error while creating token');
      }

      const {password:_, ...rest } = user;

      return {
        user: rest,
        token: token
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
