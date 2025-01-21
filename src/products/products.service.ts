import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from './adapters/products.repository';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';
import { ResponseProductDto } from './dto/response-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

type uniqueInput = Prisma.ProductWhereUniqueInput;

@Injectable()
export class ProductsService {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: ProductsRepository,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        const productEntity = new Product(createProductDto);
        const product = await this.productsRepository.create(productEntity);
        return product;
    }

    async findAll(): Promise<ResponseProductDto[]> {
        return this.productsRepository.findAll();
    }

    async findByCategory(category: string): Promise<ResponseProductDto[]> {
        return this.productsRepository.findByCategory(category);
    }

    async findOne(id: uniqueInput): Promise<ResponseProductDto> {
        return this.productsRepository.findOne(id);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<ResponseProductDto> {
        const productEntity = new Product(updateProductDto);
        return this.productsRepository.update(id, productEntity);
    }

    async remove(id: number): Promise<ResponseProductDto> {
        return this.productsRepository.delete(id);
    }
}
