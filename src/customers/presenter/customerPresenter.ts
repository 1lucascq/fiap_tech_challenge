import { Injectable } from '@nestjs/common';
import { ResponseCustomerDto } from '../dto/response-customer.dto';

@Injectable()
export class CustomerPresenter {
    toResponseDto(data: any): ResponseCustomerDto {
        return new ResponseCustomerDto(data);
    }

    toResponseDtoList(data: any[]): ResponseCustomerDto[] {
        return data.map((item) => new ResponseCustomerDto(item));
    }
}
