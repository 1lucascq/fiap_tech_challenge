import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './ports/customers.repository';
import { CustomersController } from './customers.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { UniqueEmailValidator } from './validations/uniqueEmail.validator';
import { UniqueCpfValidator } from './validations/uniqueCpf.validator';

@Module({
    imports: [PrismaModule],
    controllers: [CustomersController],
    providers: [CustomersService, CustomersRepository, UniqueEmailValidator, UniqueCpfValidator],
    exports: [CustomersRepository],
})
export class CustomersModule {}
