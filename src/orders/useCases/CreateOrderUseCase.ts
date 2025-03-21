import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { Order } from '../domain/entities/order.entity';
import { IOrdersRepository } from '../domain/interfaces/IOrdersRepository';
import { FakePayment } from 'src/infrastructure/fakePayment/FakePayment';

@Injectable()
export class CreateOrderUseCase {
    private readonly logger = new Logger(CreateOrderUseCase.name);

    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
        private readonly fakePayment: FakePayment,
    ) {}

    async execute(createOrderDto: CreateOrderDto): Promise<ResponseOrderDto> {
        this.logger.log(`Creating new order with ${createOrderDto.products.length} products`);

        const orderEntity = new Order(createOrderDto);
        const order = await this.ordersRepository.create(orderEntity);

        this.logger.log(`Order ${order.id} created, initiating fake payment process`);
        this.fakePayment
            .processPayment(order.id)
            .then((paymentResult) => {
                this.logger.log(
                    `Payment for order ${order.id} processed: ID=${paymentResult.paymentId}, success=${paymentResult.success}`,
                );
            })
            .catch((error) => {
                this.logger.error(`Payment processing failed for order ${order.id}: ${error.message}`);
            });

        return order;
    }
}
