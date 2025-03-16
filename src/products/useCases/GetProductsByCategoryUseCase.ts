import { Inject, Injectable } from '@nestjs/common';
import { ResponseProductDto } from '../dto/response-product.dto';
import { IProductsRepository } from '../domain/interfaces/IProductsRepository';
import { ProductPresenter } from '../presenter/productPresenter';

@Injectable()
export class GetProductsByCategoryUseCase {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: IProductsRepository,
        private readonly productPresenter: ProductPresenter,
    ) {}

    async execute(category: string): Promise<ResponseProductDto[]> {
        const products = await this.productsRepository.findByCategory(category);
        return this.productPresenter.toResponseDtoList(products);
    }
}
