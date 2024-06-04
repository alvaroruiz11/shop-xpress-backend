import { Validators } from '../../../config';


export class CreateProductDto {

  private constructor(
    public readonly title: string,
    public readonly price: number,
    public readonly categoryId: string,
    public readonly description?: string
  ){}

  static create(object:{[key:string]: any}): [string?, CreateProductDto?] {

    const {title, price, categoryId, description} = object;

    if(!title) return ['title is requerid'];
    if(!Validators.isNumber(price)) return ['price must be number'];
    if(!Validators.isUuid(categoryId)) return ['categoryId it has to be a uuid'];
    if(price <= 0) return ['price must be greater than 0'];

    return [undefined, new CreateProductDto(title, +price, categoryId, description)];
  }

}