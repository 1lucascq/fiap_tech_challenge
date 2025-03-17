import { Inject, Injectable } from '@nestjs/common';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { OrderStatus } from '../domain/interfaces/IOrdersRepository';
import { IOrdersRepository } from '../domain/interfaces/IOrdersRepository';

@Injectable()
export class GetOrdersByStatusUseCase {
    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
    ) {}

    async execute(status: OrderStatus): Promise<ResponseOrderDto[]> {
        const orders = await this.ordersRepository.findByStatus(status);
        return orders;
    }
}
