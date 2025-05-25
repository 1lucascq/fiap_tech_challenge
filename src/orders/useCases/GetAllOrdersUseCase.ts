import { Inject, Injectable } from '@nestjs/common';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { IOrdersRepository } from '../domain/interfaces/IOrdersRepository';

@Injectable()
export class GetAllOrdersUseCase {
    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
    ) {}

    async execute(): Promise<ResponseOrderDto[]> {
        const orders = await this.ordersRepository.findAll();
        return orders;
    }
}
