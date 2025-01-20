import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './adapters/orders.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [OrdersController],
    providers: [
        OrdersService,
        OrdersRepository,
        {
            provide: 'IOrdersRepository',
            useClass: OrdersRepository,
        },
    ],
})
export class OrdersModule {}
