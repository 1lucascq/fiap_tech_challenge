import { IsString, IsNumber, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

interface CustomerRepository {
    id: number;
    email: string;
    cpf: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ResponseCustomerDto {
    @ApiProperty({
        name: 'id',
        description: 'The id of the customer.',
        example: 1,
    })
    @IsNumber()
    readonly id: number;

    @ApiProperty({
        name: 'email',
        description: 'The email of the customer.',
        example: 'johndoe@example.com',
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        name: 'cpf',
        description: 'The CPF of the customer.',
        example: '12345678911',
    })
    @IsString()
    readonly cpf: string;

    @ApiProperty({
        name: 'name',
        description: 'The name of the customer.',
        example: 'John Doe',
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: 'The creation date of the order.',
        example: '2025-01-19T22:00:28.374Z',
    })
    @IsDateString()
    readonly createdAt: Date;

    @ApiProperty({
        description: 'The creation date of the order.',
        example: '2025-01-19T22:00:28.374Z',
    })
    @IsDateString()
    readonly updatedAt: Date;

    constructor(customer: CustomerRepository) {
        this.id = customer.id;
        this.email = customer.email;
        this.cpf = customer.cpf;
        this.name = customer.name;
    }
}
