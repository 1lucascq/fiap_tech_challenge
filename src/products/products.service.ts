import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from './ports/products.repository';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

type uniqueInput = Prisma.ProductWhereUniqueInput;

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async create(createProductDto: CreateProductDto) {
        const productEntity = new Product(createProductDto);
        const product = await this.productsRepository.create(productEntity);
        return { error: false, product };
    }

    async findAll() {
        return this.productsRepository.findAll();
    }

    async findByCategory(category: string) {
        return this.productsRepository.findByCategory(category);
    }

    async findOne(id: uniqueInput) {
        return this.productsRepository.findOne(id);
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const productEntity = new Product(updateProductDto);
        return this.productsRepository.update(id, productEntity);
    }

    async remove(id: number) {
        return this.productsRepository.delete(id);
    }
}
