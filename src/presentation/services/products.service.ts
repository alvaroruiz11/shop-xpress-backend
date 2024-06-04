import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { CustomError } from '../common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';

export class ProductsService extends PrismaClient{
  

  // DI
  constructor() {
    super();
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const total = await this.product.count({
      where: { available: true },
    });
    const totalPage = Math.ceil(total / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          available: true,
        },
      }),
      total,
      page,
      totalPage,
    };
  }

  async findOne(id: string) {
    const product = await this.product.findUnique({
      where: { id },
      include: { Category: { select: { name: true } } },
    });
    if (!product) {
      throw CustomError.notFound(`Product whit id: #${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.product.create({
        data: createProductDto
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { id: _, ...data } = updateProductDto;
    try {
      await this.findOne(id);

      return this.product.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async delete(id: string) {
    try {
      const product = await this.findOne(id);

      if (!product.available) return product;

      return this.product.update({
        where: { id },
        data: {
          available: false,
        },
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
