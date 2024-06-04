

export class UpdateCategoryDto {


  private constructor(
    public readonly id?: string,
    public readonly name?: string
  ) {}

  static create(object: {[key:string]: any}):[string?, UpdateCategoryDto?] {

    const { id, name } = object;

    return [undefined, new UpdateCategoryDto(id,name)];
  }

}