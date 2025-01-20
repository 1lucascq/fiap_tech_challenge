import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './adapters/products.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { UniqueProductNameValidator } from './validations/uniqueProductName.validator';

@Module({
    imports: [PrismaModule],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        ProductsRepository,
        UniqueProductNameValidator,
        {
            provide: 'IProductsRepository',
            useClass: ProductsRepository,
        },
    ],
    exports: [ProductsRepository],
})
export class ProductsModule {}
