import { Injectable } from '@nestjs/common';
import { PaymentWebhookDto } from '../dto/paymentWebhook.dto';
import { PaymentGatewayEvent } from '../domain/interfaces/paymentGateway.interface';

@Injectable()
export class WebhookToDomainAdapter {
    adaptToDomainEvent(webhookDto: PaymentWebhookDto): PaymentGatewayEvent {
        return {
            paymentId: webhookDto.paymentId,
            orderId: webhookDto.orderId,
            status: webhookDto.status,
            provider: webhookDto.provider,
            timestamp: new Date(),
        };
    }
}
