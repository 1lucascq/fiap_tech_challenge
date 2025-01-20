import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface OrderProduct {
    productId: number;
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({
        description: 'The customer ID.',
        example: 1,
    })
    @IsNumber()
    readonly customerId: number;

    @ApiProperty({
        description: 'The products in the order.',
        example: [{ productId: 1, quantity: 2 }],
    })
    @IsArray()
    readonly products: OrderProduct[];

    @ApiProperty({
        description: 'The total amount of the order.',
        example: 100.55,
    })
    @IsNumber()
    readonly total: number;
}
