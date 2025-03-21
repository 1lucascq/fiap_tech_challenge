import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from 'prisma/prisma.module';
import { WebhooksModule } from './infrastructure/paymentWebhook/paymentWebhook.module';

@Module({
    imports: [PrismaModule, ProductsModule, CustomersModule, OrdersModule, WebhooksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
