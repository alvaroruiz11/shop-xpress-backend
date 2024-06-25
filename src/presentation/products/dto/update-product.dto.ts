import { Validators } from '../../../config';

export class UpdateProductDto {
  private constructor(
    public readonly id?: string,
    public readonly title?: string,
    public readonly price?: number,
    public readonly categoryId?: string,
    public readonly description?: string,
    public readonly image?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { id, title, price, categoryId, userId, description, image } = object;


    if( categoryId ) {
      if(!Validators.isUuid(categoryId)) return ['categoryId it has to be a uuid'];
    }

    return [
      undefined,
      new UpdateProductDto(
        id,
        title,
        price ? +price : undefined,
        categoryId,
        description,
        image
      ),
    ];
  }
}
