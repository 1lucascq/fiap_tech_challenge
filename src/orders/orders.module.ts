import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './adapters/orders.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderPresenter } from './presenter/orderPresenter';
import { CreateOrderUseCase } from './useCases/CreateOrderUseCase';
import { GetAllOrdersUseCase } from './useCases/GetAllOrdersUseCase';
import { GetOrdersByStatusUseCase } from './useCases/GetOrdersByStatusUseCase';
import { GetOrderUseCase } from './useCases/GetOrderUseCase';
import { UpdateOrderStatusUseCase } from './useCases/UpdateOrderStatusUseCase';
import { DeleteOrderUseCase } from './useCases/DeleteOrderUseCase';
import { GetPaymentStatusUseCase } from './useCases/GetPaymentStatusUseCase';
import { GetOrdersByPriorityUseCase } from './useCases/GetOrdersByPriorityUseCase';
import { PaymentModule } from 'src/infrastructure/fakePayment/fakePayment.module';

@Module({
    imports: [PrismaModule, PaymentModule],
    controllers: [OrdersController],
    providers: [
        // Repository
        OrdersRepository,
        {
            provide: 'IOrdersRepository',
            useClass: OrdersRepository,
        },
        // Presenters
        OrderPresenter,
        // Use Cases
        CreateOrderUseCase,
        GetAllOrdersUseCase,
        GetOrdersByStatusUseCase,
        GetOrderUseCase,
        UpdateOrderStatusUseCase,
        DeleteOrderUseCase,
        GetPaymentStatusUseCase,
        GetOrdersByPriorityUseCase,
    ],
    exports: [
        {
            provide: 'IOrdersRepository',
            useClass: OrdersRepository,
        },
    ],
})
export class OrdersModule {}
