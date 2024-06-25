import { PrismaClient } from '@prisma/client';
import { PaginationDto, CustomError } from '../common';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';

export class CategoriesService extends PrismaClient{

  // DI
  constructor() {
    super();
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const total = await this.category.count();
    const totalPage = Math.ceil( total / limit );
    return {
      data: await this.category.findMany({
        skip: ( page - 1 ) * limit,
        take: limit
      }),
      total,
      page,
      totalPage,
    }
    
  }

  async findOne(id: string) {
    const category = await this.category.findUnique({ where: { id } });
    if (!category) {
      throw CustomError.notFound(`Category whit id: #${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    try {
      const category = await this.category.create({
        data: { name },
      });
      return category;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { id: _, ...data } = updateCategoryDto;
    try {
      await this.findOne(id);

      return this.category.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async delete(id: string) {
    try {
      const category = await this.findOne(id);

      if(!category.available) return category;

      return this.category.update({
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
