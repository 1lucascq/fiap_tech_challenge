import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ResponseCustomerDto } from '../dto/response-customer.dto';
import { CustomerPresenter } from '../presenter/customerPresenter';
import { CustomersRepository } from '../adapters/customers.repository';

@Injectable()
export class GetCustomerUseCase {
    constructor(
        @Inject('ICustomersRepository')
        private readonly customersRepository: CustomersRepository,
        private readonly customerPresenter: CustomerPresenter,
    ) {}

    async execute(uniqueInput: Prisma.CustomerWhereUniqueInput): Promise<ResponseCustomerDto> {
        const customer = await this.customersRepository.findOne(uniqueInput);
        return this.customerPresenter.toResponseDto(customer);
    }
}
