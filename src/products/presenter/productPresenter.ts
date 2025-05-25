import { Injectable } from '@nestjs/common';
import { ResponseProductDto } from '../dto/response-product.dto';

@Injectable()
export class ProductPresenter {
    toResponseDto(data: any): ResponseProductDto {
        return new ResponseProductDto(data);
    }

    toResponseDtoList(data: any[]): ResponseProductDto[] {
        return data.map((item) => new ResponseProductDto(item));
    }
}
