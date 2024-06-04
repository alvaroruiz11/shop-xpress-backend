import { validate } from 'uuid'
export class Validators {
  static isUuid(uuid: string) {
    return validate(uuid);
  }

  static isNumber(number: number) {
    return !isNaN(number);
  }
}
