import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IProductsRepository } from '../../domain/interfaces/IProductsRepository';

@Injectable()
export class ProductValidationService {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: IProductsRepository,
    ) {}

    async findOne(uniqueInput: Prisma.ProductWhereUniqueInput) {
        return this.productsRepository.findOne(uniqueInput);
    }
}
