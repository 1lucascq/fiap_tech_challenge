import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersRepository } from './adapters/orders.repository';
import { ResponseOrderDto } from './dto/response-order.dto';
import { OrderStatus } from './types';

@Injectable()
export class OrdersService {
    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: OrdersRepository,
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<ResponseOrderDto> {
        const orderEntity = new Order(createOrderDto);
        const order = await this.ordersRepository.create(orderEntity);

        return order;
    }

    async findAll(): Promise<ResponseOrderDto[]> {
        return this.ordersRepository.findAll();
    }

    async findByStatus(status: OrderStatus): Promise<ResponseOrderDto[]> {
        return this.ordersRepository.findByStatus(status);
    }

    async findOne(id: number): Promise<ResponseOrderDto> {
        return this.ordersRepository.findOne(id);
    }

    async updateStatus(id: number, newStatus: OrderStatus): Promise<ResponseOrderDto> {
        return this.ordersRepository.updateStatus(id, newStatus);
    }

    async remove(id: number): Promise<ResponseOrderDto> {
        return this.ordersRepository.delete(id);
    }
}
