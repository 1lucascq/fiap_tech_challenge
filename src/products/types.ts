import { ResponseProductDto } from './dto/response-product.dto';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';

// PORT
export interface IProductsRepository {
    create(productEntity: Product): Promise<ResponseProductDto>;
    findAll(): Promise<ResponseProductDto[]>;
    findByCategory(category: string): Promise<ResponseProductDto[]>;
    findOne(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<ResponseProductDto>;
    update(id: number, data: Product): Promise<ResponseProductDto>;
    delete(id: number): Promise<ResponseProductDto>;
}
