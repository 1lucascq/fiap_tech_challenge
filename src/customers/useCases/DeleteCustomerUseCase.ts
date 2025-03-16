import { Inject, Injectable } from '@nestjs/common';
import { ResponseCustomerDto } from '../dto/response-customer.dto';
import { ICustomersRepository } from '../domain/interfaces/ICustomersRepository';
import { CustomerPresenter } from '../presenter/customerPresenter';

@Injectable()
export class DeleteCustomerUseCase {
    constructor(
        @Inject('ICustomersRepository')
        private readonly customersRepository: ICustomersRepository,
        private readonly customerPresenter: CustomerPresenter,
    ) {}

    async execute(cpf: string): Promise<ResponseCustomerDto> {
        const customer = await this.customersRepository.delete(cpf);
        return this.customerPresenter.toResponseDto(customer);
    }
}
