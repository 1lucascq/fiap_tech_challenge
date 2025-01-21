import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface OrderProduct {
    productId: number;
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({
        name: 'customerId',
        description: 'The customer ID.',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    readonly customerId: number;

    @ApiProperty({
        name: 'products',
        description: 'The products in the order.',
        example: [{ productId: 1, quantity: 2 }],
    })
    @IsArray()
    readonly products: OrderProduct[];

    @ApiProperty({
        name: 'total',
        description: 'The total amount of the order.',
        example: 100.55,
    })
    @IsNumber()
    readonly total: number;
}
