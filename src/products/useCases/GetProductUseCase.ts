import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ResponseProductDto } from '../dto/response-product.dto';
import { IProductsRepository } from '../domain/interfaces/IProductsRepository';
import { ProductPresenter } from '../presenter/productPresenter';

@Injectable()
export class GetProductUseCase {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: IProductsRepository,
        private readonly productPresenter: ProductPresenter,
    ) {}

    async execute(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<ResponseProductDto> {
        const product = await this.productsRepository.findOne(uniqueInput);
        return this.productPresenter.toResponseDto(product);
    }
}
