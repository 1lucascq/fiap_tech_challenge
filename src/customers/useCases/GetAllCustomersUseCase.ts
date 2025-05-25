import { Inject, Injectable } from '@nestjs/common';
import { ResponseCustomerDto } from '../dto/response-customer.dto';
import { ICustomersRepository } from '../domain/interfaces/ICustomersRepository';
import { CustomerPresenter } from '../presenter/customerPresenter';

@Injectable()
export class GetAllCustomersUseCase {
    constructor(
        @Inject('ICustomersRepository')
        private readonly customersRepository: ICustomersRepository,
        private readonly customerPresenter: CustomerPresenter,
    ) {}

    async execute(): Promise<ResponseCustomerDto[]> {
        const customers = await this.customersRepository.findAll();
        return this.customerPresenter.toResponseDtoList(customers);
    }
}
