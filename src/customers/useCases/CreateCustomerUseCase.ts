import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { ResponseCustomerDto } from '../dto/response-customer.dto';
import { Customer } from '../domain/entities/customer.entity';
import { ICustomersRepository } from '../domain/interfaces/ICustomersRepository';
import { CustomerPresenter } from '../presenter/customerPresenter';

@Injectable()
export class CreateCustomerUseCase {
    constructor(
        @Inject('ICustomersRepository')
        private readonly customersRepository: ICustomersRepository,
        private readonly customerPresenter: CustomerPresenter,
    ) {}

    async execute(createCustomerDto: CreateCustomerDto): Promise<ResponseCustomerDto> {
        const customerEntity = new Customer(createCustomerDto);
        const customer = await this.customersRepository.create(customerEntity);
        return this.customerPresenter.toResponseDto(customer);
    }
}
