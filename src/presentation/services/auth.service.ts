import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { BcryptAdapter, CustomError } from '../../config';
import { LoginUserDto } from '../auth/dto/login-user.dto';

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

      const { password: _, ...rest } = user;

      return {
        user: rest,
        // todo: generateToken
        token: 'ABC123'
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

      const {password:_, ...rest } = user;

      return {
        user: rest,
        // todo: generateToken
        token: 'ABC123'
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
