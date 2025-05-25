import { Module } from '@nestjs/common';
import { PaymentWebhookController } from './paymentWebhook.controller';
import { ProcessPaymentWebhookUseCase } from './useCases/processPaymentWebhookUseCase';
import { WebhookToDomainAdapter } from './adapters/webhookToDomain.adapter';
import { OrdersModule } from '../../orders/orders.module';

@Module({
    imports: [OrdersModule],
    controllers: [PaymentWebhookController],
    providers: [ProcessPaymentWebhookUseCase, WebhookToDomainAdapter],
})
export class WebhooksModule {}
