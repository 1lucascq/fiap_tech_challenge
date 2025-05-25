import { Injectable } from '@nestjs/common';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { OrderPaymentStatus } from '../domain/interfaces/IOrdersRepository';

@Injectable()
export class OrderPresenter {
    toResponseDto(data): ResponseOrderDto {
        return new ResponseOrderDto(data);
    }

    toResponseDtoList(data): ResponseOrderDto[] {
        return data.map((item) => new ResponseOrderDto(item));
    }

    toPaymentStatusDto(data): OrderPaymentStatus {
        return { paymentId: data.id || 0, status: data.status };
    }
}
