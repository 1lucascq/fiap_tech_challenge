import { Injectable } from '@nestjs/common';
import { ResponseOrderDto } from '../dto/response-order.dto';

@Injectable()
export class OrderPresenter {
    toResponseDto(data: any): ResponseOrderDto {
        return new ResponseOrderDto(data);
    }

    toResponseDtoList(data: any[]): ResponseOrderDto[] {
        return data.map((item) => new ResponseOrderDto(item));
    }
}
