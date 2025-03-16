import { Inject, Injectable } from '@nestjs/common';
import { ResponseProductDto } from '../dto/response-product.dto';
import { IProductsRepository } from '../domain/interfaces/IProductsRepository';
import { ProductPresenter } from '../presenter/productPresenter';

@Injectable()
export class DeleteProductUseCase {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: IProductsRepository,
        private readonly productPresenter: ProductPresenter,
    ) {}

    async execute(id: number): Promise<ResponseProductDto> {
        const product = await this.productsRepository.delete(id);
        return this.productPresenter.toResponseDto(product);
    }
}
