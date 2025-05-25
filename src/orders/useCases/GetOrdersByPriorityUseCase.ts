import { Inject, Injectable } from '@nestjs/common';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { IOrdersRepository, OrderStatus } from '../domain/interfaces/IOrdersRepository';

@Injectable()
export class GetOrdersByPriorityUseCase {
    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
    ) {}

    async execute(): Promise<ResponseOrderDto[]> {
        const orders = await this.ordersRepository.findAll();

        const filteredOrders = orders.filter(
            (order) => ![OrderStatus.CONCLUDED, OrderStatus.CANCELED].includes(order.status),
        );

        const statusPriority = {
            [OrderStatus.READY_FOR_PICKUP]: 1,
            [OrderStatus.IN_PROGRESS]: 2,
            [OrderStatus.CREATED]: 3,
        };

        const sortedOrders = filteredOrders.sort((a, b) => {
            if (statusPriority[a.status] !== statusPriority[b.status]) {
                return statusPriority[a.status] - statusPriority[b.status];
            }

            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });

        return sortedOrders;
    }
}
