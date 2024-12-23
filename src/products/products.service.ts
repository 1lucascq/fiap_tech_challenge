import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './ports/products.repository';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';

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

    async findOne(uniqueInput: uniqueInput) {
        return this.productsRepository.findOne(uniqueInput);
    }

    // async update(data: string, updateProductDto: UpdateProductDto) {
    //     return this.productsRepository.update(data, updateProductDto);
    // }

    // async remove(data: string) {
    //     return this.productsRepository.delete(data);
    // }
}
