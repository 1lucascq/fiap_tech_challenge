import { Inject, Injectable } from '@nestjs/common';
import { ResponseProductDto } from '../dto/response-product.dto';
import { IProductsRepository } from '../domain/interfaces/IProductsRepository';
import { ProductPresenter } from '../presenter/productPresenter';

@Injectable()
export class GetAllProductsUseCase {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: IProductsRepository,
        private readonly productPresenter: ProductPresenter,
    ) {}

    async execute(): Promise<ResponseProductDto[]> {
        const products = await this.productsRepository.findAll();
        return this.productPresenter.toResponseDtoList(products);
    }
}
