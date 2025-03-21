import { PaymentStatus } from '../../../../orders/domain/interfaces/IOrdersRepository';

export interface PaymentGatewayEvent {
    paymentId: number;
    orderId: number;
    status: PaymentStatus;
    provider: string;
    timestamp: Date;
}

export interface IPaymentGateway {
    verifySignature(payload: any, signature: string): boolean;
    processWebhookEvent(payload: any): PaymentGatewayEvent;
}
