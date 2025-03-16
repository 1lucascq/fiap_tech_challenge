import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './adapters/products.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { UniqueProductNameValidator } from './validations/uniqueProductName.validator';
import { ProductValidationService } from './validations/services/productValidationService';
import { ProductPresenter } from './presenter/productPresenter';
import { CreateProductUseCase } from './useCases/CreateProductUseCase';
import { GetAllProductsUseCase } from './useCases/GetAllProductsUseCase';
import { GetProductsByCategoryUseCase } from './useCases/GetProductsByCategoryUseCase';
import { GetProductUseCase } from './useCases/GetProductUseCase';
import { UpdateProductUseCase } from './useCases/UpdateProductUseCase';
import { DeleteProductUseCase } from './useCases/DeleteProductUseCase';

@Module({
    imports: [PrismaModule],
    controllers: [ProductsController],
    providers: [
        // Repository
        ProductsRepository,
        {
            provide: 'IProductsRepository',
            useClass: ProductsRepository,
        },
        // Presenters
        ProductPresenter,
        // Use Cases
        CreateProductUseCase,
        GetAllProductsUseCase,
        GetProductsByCategoryUseCase,
        GetProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
        // Validation
        ProductValidationService,
        UniqueProductNameValidator,
    ],
    exports: [ProductsRepository],
})
export class ProductsModule {}
