import { regularExps } from '../../../config';

export class RegisterUserDto {
  private constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { firstName, lastName, email, password } = object;

    if (!firstName) return ['Missing firstName'];
    if (!lastName) return ['Missing lastName'];
    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (password.length < 6) return ['Password too short'];

    return [
      undefined,
      new RegisterUserDto(firstName, lastName, email, password),
    ];
  }
}
