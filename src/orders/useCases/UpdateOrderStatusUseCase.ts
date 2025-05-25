import { Inject, Injectable } from '@nestjs/common';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { OrderStatus } from '../domain/interfaces/IOrdersRepository';
import { IOrdersRepository } from '../domain/interfaces/IOrdersRepository';

@Injectable()
export class UpdateOrderStatusUseCase {
    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
    ) {}

    async execute(id: number, newStatus: OrderStatus): Promise<ResponseOrderDto> {
        const order = await this.ordersRepository.updateStatus(id, newStatus);
        return order;
    }
}
