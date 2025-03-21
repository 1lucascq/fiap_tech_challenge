import { ResponseOrderDto } from '../../dto/response-order.dto';
import { Order } from '../entities/order.entity';

export enum OrderStatus {
    CREATED = 'CREATED',
    IN_PROGRESS = 'IN_PROGRESS',
    READY_FOR_PICKUP = 'READY_FOR_PICKUP',
    CONCLUDED = 'CONCLUDED',
    CANCELED = 'CANCELED',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    REFUSED = 'REFUSED',
}

export interface OrderPaymentStatus {
    paymentId: number;
    status: PaymentStatus;
}

// PORT
export interface IOrdersRepository {
    create(orderEntity: Order): Promise<ResponseOrderDto>;
    findAll(): Promise<ResponseOrderDto[]>;
    findByStatus(status: OrderStatus): Promise<ResponseOrderDto[]>;
    updateStatus(id: number, newStatus: OrderStatus): Promise<ResponseOrderDto>;
    findOne(id: number): Promise<ResponseOrderDto>;
    delete(id: number): Promise<ResponseOrderDto>;
    getPaymentStatus(id: number): Promise<OrderPaymentStatus>;
    updatePaymentStatus(orderId: number, status: PaymentStatus, paymentId: number): Promise<void>;
}
