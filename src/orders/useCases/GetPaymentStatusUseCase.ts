import { Inject, Injectable } from '@nestjs/common';
import { IOrdersRepository, OrderPaymentStatus } from '../domain/interfaces/IOrdersRepository';

@Injectable()
export class GetPaymentStatusUseCase {
    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
    ) {}

    async execute(id: number): Promise<OrderPaymentStatus> {
        const paymentStatus = await this.ordersRepository.getPaymentStatus(id);
        return paymentStatus;
    }
}
