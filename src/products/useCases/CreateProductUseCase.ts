import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ResponseProductDto } from '../dto/response-product.dto';
import { Product } from '../domain/entities/product.entity';
import { IProductsRepository } from '../domain/interfaces/IProductsRepository';
import { ProductPresenter } from '../presenter/productPresenter';

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: IProductsRepository,
        private readonly productPresenter: ProductPresenter,
    ) {}

    async execute(createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        const productEntity = new Product(createProductDto);
        const product = await this.productsRepository.create(productEntity);
        return this.productPresenter.toResponseDto(product);
    }
}
