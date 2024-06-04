import { Validators } from '../../../config';

export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(page: number = 1 , limit:number = 10): [string?, PaginationDto?] {
    

    if (!Validators.isNumber(page)) return ['page must be number'];
    if( page <= 0 ) return ['page must be greater than 0'];
    if (!Validators.isNumber(limit)) return ['limit must be number'];
    if( limit <= 0 ) return ['limit must be greater than 0'];
    return [undefined, new PaginationDto(page, limit)];
  }
}
