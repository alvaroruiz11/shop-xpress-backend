import type { Request, Response } from 'express';
import { CategoriesService } from '../services';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Validators } from '../../config';
import { PaginationDto, CustomError } from '../common';

export class CategoriesController {
  // DI
  constructor(private readonly categoriesService: CategoriesService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  findAllCategories = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });
    this.categoriesService
      .findAll(paginationDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  };

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.categoriesService
      .create(createCategoryDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  };

  updateCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!Validators.isUuid(id))
      return res.status(400).json({ error: 'It has to be a uuid' });
    const [error, updateCategoryDto] = UpdateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.categoriesService
      .update(id, updateCategoryDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  };

  deleteCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!Validators.isUuid(id))
      return res.status(400).json({ error: 'It has to be a uuid' });
    this.categoriesService
      .delete(id)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  };
}
