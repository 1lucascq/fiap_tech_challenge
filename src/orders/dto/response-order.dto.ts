import { IsArray, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../types';

interface OrderRepository {
    customer: {
        id: number;
        name: string;
        cpf: string;
        email: string;
    };
    products: {
        product: {
            id: number;
            name: string;
            price: number;
        };
        id: number;
        quantity: number;
        productId: number;
        orderId: number;
    }[];
    id: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    total: number;
    customerId: number;
}

interface OrderProductResponse {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface OrderCustomerResponse {
    id: number;
    name: string;
    cpf: string;
    email: string;
}

export class ResponseOrderDto {
    @ApiProperty({
        name: 'id',
        description: 'The id of the order.',
        example: 1,
    })
    @IsNumber()
    readonly id: number;

    @ApiProperty({
        name: 'status',
        description: 'The status of the order.',
        example: OrderStatus.IN_PROGRESS,
        enum: OrderStatus,
    })
    @IsEnum(OrderStatus)
    readonly status: OrderStatus;

    @ApiProperty({
        name: 'customer',
        description: 'The customer data OR null.',
        example: { id: 1, name: 'John Doe', cpf: '12345678901', email: 'email@test.com' },
    })
    @IsNumber()
    readonly customer: OrderCustomerResponse;

    @ApiProperty({
        name: 'products',
        description: 'The products in the order.',
        example: [{ productId: 1, quantity: 2 }],
    })
    @IsArray()
    readonly products: OrderProductResponse[];

    @ApiProperty({
        name: 'createdAt',
        description: 'The creation date of the order.',
        example: '2025-01-19T22:00:28.374Z',
    })
    @IsDateString()
    readonly createdAt: Date;

    @ApiProperty({
        name: 'updatedAt',
        description: 'The creation date of the order.',
        example: '2025-01-19T22:00:28.374Z',
    })
    @IsDateString()
    readonly updatedAt: Date;

    @ApiProperty({
        name: 'total',
        description: 'The total amount of the order.',
        example: 100.55,
    })
    @IsNumber()
    readonly total: number;

    constructor(order: OrderRepository) {
        this.id = order.id;
        this.status = order.status as OrderStatus;
        if (order.customer) {
            this.customer = {
                id: order.customer.id,
                name: order.customer.name,
                cpf: order.customer.cpf,
                email: order.customer.email,
            };
        } else {
            this.customer = null;
        }
        this.products = order.products.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
        }));
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
        this.total = order.total;
    }
}
