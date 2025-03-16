import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './adapters/customers.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { UniqueEmailValidator } from './validations/uniqueEmail.validator';
import { UniqueCpfValidator } from './validations/uniqueCpf.validator';
import { CustomerValidationService } from './validations/services/customerValidationService';
import { CreateCustomerUseCase } from './useCases/CreateCustomerUseCase';
import { GetAllCustomersUseCase } from './useCases/GetAllCustomersUseCase';
import { GetCustomerUseCase } from './useCases/GetCustomerUseCase';
import { UpdateCustomerUseCase } from './useCases/UpdateCustomerUseCase';
import { DeleteCustomerUseCase } from './useCases/DeleteCustomerUseCase';
import { CustomerPresenter } from './presenter/customerPresenter';

@Module({
    imports: [PrismaModule],
    controllers: [CustomersController],
    providers: [
        // Repository
        CustomersRepository,
        {
            provide: 'ICustomersRepository',
            useClass: CustomersRepository,
        },
        // Presenters
        CustomerPresenter,
        // Use Cases
        CreateCustomerUseCase,
        GetAllCustomersUseCase,
        GetCustomerUseCase,
        UpdateCustomerUseCase,
        DeleteCustomerUseCase,
        // Validation
        CustomerValidationService,
        UniqueEmailValidator,
        UniqueCpfValidator,
    ],
    exports: [CustomersRepository],
})
export class CustomersModule {}
