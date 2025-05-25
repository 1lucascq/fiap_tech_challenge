import { Injectable, Logger } from '@nestjs/common';
import { PaymentStatus } from '../../orders/domain/interfaces/IOrdersRepository';
import { randomInt } from 'crypto';

@Injectable()
export class FakePayment {
    private readonly logger = new Logger(FakePayment.name);

    async processPayment(orderId: number): Promise<{
        paymentId: number;
        success: boolean;
        orderId: number;
    }> {
        const paymentId = randomInt(0, 100);

        // odd = success / even = failure
        const success = paymentId % 2 === 1;

        this.logger.log(`Processing payment for order ${orderId}: paymentId=${paymentId}, success=${success}`);

        // Schedule the webhook call for 10 seconds later
        this.scheduleWebhookCall(orderId, paymentId, success);

        return {
            paymentId,
            success,
            orderId,
        };
    }

    private scheduleWebhookCall(orderId: number, paymentId: number, success: boolean): void {
        const webhookDelay = 10000;

        this.logger.log(`Scheduling webhook call for order ${orderId} in ${webhookDelay}ms`);

        setTimeout(async () => {
            try {
                await this.callPaymentWebhook(orderId, paymentId, success);
            } catch (error) {
                this.logger.error(`Failed to call payment webhook: ${error.message}`);
            }
        }, webhookDelay);
    }

    private async callPaymentWebhook(orderId: number, paymentId: number, success: boolean): Promise<void> {
        this.logger.log(`Calling payment webhook for order ${orderId}`);

        const webhookPayload = {
            paymentId,
            orderId,
            status: success ? PaymentStatus.PAID : PaymentStatus.REFUSED,
            provider: 'mock-payment-provider',
        };

        try {
            const response = await fetch('http://localhost:3000/webhooks/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(webhookPayload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            this.logger.log(`Payment webhook called successfully for order ${orderId}: ${response.status}`);
        } catch (error) {
            this.logger.error(`Error calling payment webhook: ${error.message}`);
            throw error;
        }
    }
}
