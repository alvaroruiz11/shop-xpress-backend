import type { Request, Response } from 'express';
import { Validators } from '../../config';
import { CustomError, PaginationDto } from '../common';
import { ProductsService } from '../services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


export class ProductsController {
  
  constructor(
    private readonly productsService: ProductsService
  ){}


  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  findAllProducts = ( req: Request, res: Response ) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if(error) return res.status(400).json({ error });
    this.productsService.findAll(paginationDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  }


  getProductsByUserId = ( req: Request, res: Response ) => { 
    const { id } = req.params;
    if(!Validators.isUuid(id)) return res.status(400).json({ error: 'It has to be a uuid'});
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if(error) return res.status(400).json({ error });
    this.productsService.getProductsByUserId(id, paginationDto!!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  }


  findOneProduct = ( req: Request, res: Response ) => {
    const { id } = req.params;
    if(!Validators.isUuid(id)) return res.status(400).json({ error: 'It has to be a uuid'})
    this.productsService.findOne(id)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  }
  createProduct = ( req: Request, res: Response ) => {

    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      userId: req.body.user.id
    });
    if(error) return res.status(400).json({ error });
   
    this.productsService.create(createProductDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  }
  updateProduct = ( req: Request, res: Response ) => {
    const { id } = req.params;
    if(!Validators.isUuid(id)) return res.status(400).json({ error: 'It has to be a uuid'})

    const [error, updateProductDto] = UpdateProductDto.create(req.body);
    if(error) return res.status(400).json({ error });
    
    this.productsService.update(id, updateProductDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  }
  deleteProduct = ( req: Request, res: Response ) => {
    const { id } = req.params;
    if(!Validators.isUuid(id)) return res.status(400).json({ error: 'It has to be a uuid'})
    this.productsService.delete(id)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  }

}