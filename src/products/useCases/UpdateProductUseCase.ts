import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ResponseProductDto } from '../dto/response-product.dto';
import { Product } from '../domain/entities/product.entity';
import { IProductsRepository } from '../domain/interfaces/IProductsRepository';
import { ProductPresenter } from '../presenter/productPresenter';

@Injectable()
export class UpdateProductUseCase {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: IProductsRepository,
        private readonly productPresenter: ProductPresenter,
    ) {}

    async execute(id: number, updateProductDto: UpdateProductDto): Promise<ResponseProductDto> {
        const productEntity = new Product(updateProductDto);
        const product = await this.productsRepository.update(id, productEntity);
        return this.productPresenter.toResponseDto(product);
    }
}
