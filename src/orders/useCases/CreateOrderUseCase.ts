import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { Order } from '../domain/entities/order.entity';
import { IOrdersRepository } from '../domain/interfaces/IOrdersRepository';

@Injectable()
export class CreateOrderUseCase {
    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
    ) {}

    async execute(createOrderDto: CreateOrderDto): Promise<ResponseOrderDto> {
        const orderEntity = new Order(createOrderDto);
        const order = await this.ordersRepository.create(orderEntity);
        return order;
    }
}
