import { Body, Controller, Headers, HttpStatus, Post, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentWebhookDto } from './dto/paymentWebhook.dto';
import { ProcessPaymentWebhookUseCase } from './useCases/processPaymentWebhookUseCase';
import { WebhookToDomainAdapter } from './adapters/webhookToDomain.adapter';

@ApiTags('Payment Webhooks')
@Controller('webhooks/payment')
export class PaymentWebhookController {
    private readonly logger = new Logger(PaymentWebhookController.name);

    constructor(
        private readonly processPaymentWebhookUseCase: ProcessPaymentWebhookUseCase,
        private readonly webhookToDomainAdapter: WebhookToDomainAdapter,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Receive payment webhook notifications from payment providers' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Payment webhook processed successfully',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid webhook data',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid webhook signature',
    })
    async handlePaymentWebhook(
        @Body() webhookData: PaymentWebhookDto,
        @Headers('x-webhook-signature') signature?: string,
    ): Promise<{ success: boolean }> {
        this.logger.log(`Received payment webhook for order ${webhookData.orderId}`);

        try {
            if (signature) {
                this.logger.debug(`Webhook signature received: ${signature}`);
            }
            const paymentEvent = this.webhookToDomainAdapter.adaptToDomainEvent(webhookData);

            await this.processPaymentWebhookUseCase.execute(paymentEvent);

            return { success: true };
        } catch (error) {
            this.logger.error(`Error handling payment webhook: ${error.message}`);
            throw error;
        }
    }
}
