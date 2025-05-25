import { Inject, Injectable } from '@nestjs/common';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { IOrdersRepository } from '../domain/interfaces/IOrdersRepository';

@Injectable()
export class GetOrderUseCase {
    constructor(
        @Inject('IOrdersRepository')
        private readonly ordersRepository: IOrdersRepository,
    ) {}

    async execute(id: number): Promise<ResponseOrderDto> {
        const order = await this.ordersRepository.findOne(id);
        return order;
    }
}
