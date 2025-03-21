import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PaymentGatewayEvent } from '../domain/interfaces/paymentGateway.interface';
import { IOrdersRepository, OrderStatus, PaymentStatus } from '../../../orders/domain/interfaces/IOrdersRepository';

@Injectable()
export class ProcessPaymentWebhookUseCase {
    private readonly logger = new Logger(ProcessPaymentWebhookUseCase.name);

    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
    ) {}

    async execute(paymentEvent: PaymentGatewayEvent): Promise<void> {
        this.logger.log(`Processing payment webhook for order ${paymentEvent.orderId}`);

        try {
            const order = await this.ordersRepository.findOne(paymentEvent.orderId);

            if (!order) {
                this.logger.error(`Order not found: ${paymentEvent.orderId}`);
                throw new NotFoundException(`Order not found: ${paymentEvent.orderId}`);
            }

            await this.ordersRepository.updatePaymentStatus(
                paymentEvent.orderId,
                paymentEvent.status,
                paymentEvent.paymentId,
            );

            if (paymentEvent.status === PaymentStatus.PAID && order.status === OrderStatus.CREATED) {
                await this.ordersRepository.updateStatus(paymentEvent.orderId, OrderStatus.IN_PROGRESS);
                this.logger.log(`Order ${paymentEvent.orderId} automatically progressed to IN_PROGRESS`);
            }

            if (paymentEvent.status === PaymentStatus.REFUSED && order.status === OrderStatus.CREATED) {
                await this.ordersRepository.updateStatus(paymentEvent.orderId, OrderStatus.CANCELED);
                this.logger.log(`Order ${paymentEvent.orderId} automatically progressed to CANCELED`);
            }

            this.logger.log(`Successfully processed payment webhook for order ${paymentEvent.orderId}`);
        } catch (error) {
            this.logger.error(`Error processing payment webhook: ${error.message}`);
            throw error;
        }
    }
}
