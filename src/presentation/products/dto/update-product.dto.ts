export class UpdateProductDto {
  private constructor(
    public readonly id?: string,
    public readonly title?: string,
    public readonly price?: number,
    public readonly description?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { id, title, price, description } = object;

    return [
      undefined,
      new UpdateProductDto(id, title, price ? +price : undefined, description),
    ];
  }
}
