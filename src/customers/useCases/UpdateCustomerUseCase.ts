import { Inject, Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { ResponseCustomerDto } from '../dto/response-customer.dto';
import { Customer } from '../domain/entities/customer.entity';
import { ICustomersRepository } from '../domain/interfaces/ICustomersRepository';
import { CustomerPresenter } from '../presenter/customerPresenter';

@Injectable()
export class UpdateCustomerUseCase {
    constructor(
        @Inject('ICustomersRepository')
        private readonly customersRepository: ICustomersRepository,
        private readonly customerPresenter: CustomerPresenter,
    ) {}

    async execute(cpf: string, updateCustomerDto: UpdateCustomerDto): Promise<ResponseCustomerDto> {
        const customerEntity = new Customer(updateCustomerDto as Customer);
        const customer = await this.customersRepository.update(cpf, customerEntity);
        return this.customerPresenter.toResponseDto(customer);
    }
}
