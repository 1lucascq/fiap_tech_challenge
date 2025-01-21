import { IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

interface ProductRepository {
    id: number;
    name: string;
    ingredients: string[];
    categoryId: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    category?: {
        id: number;
        name: string;
    };
}

export class ResponseProductDto {
    @ApiProperty({
        name: 'id',
        description: 'The id of the product.',
        example: 1,
    })
    @IsNumber()
    readonly id: number;

    @ApiProperty({
        name: 'name',
        description: 'The name of the product.',
        example: 'X-Burger',
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        name: 'ingredients',
        description: 'The ingredients of the product.',
        example: ['Bread', 'Hamburger', 'Cheese', 'Lettuce', 'Tomato'],
    })
    @IsString()
    readonly ingredients: string[];

    @ApiProperty({
        name: 'categoryId',
        description: 'The category ID of the product.',
        example: 1,
    })
    @IsNumber()
    readonly categoryId: number;

    @ApiProperty({
        name: 'price',
        description: 'The price of the product.',
        example: 24.9,
    })
    @IsNumber()
    readonly price: number;

    @ApiProperty({
        name: 'createdAt',
        description: 'The creation date of the product.',
        example: '2025-01-19T22:00:28.374Z',
    })
    @IsDateString()
    readonly createdAt: Date;

    @ApiProperty({
        name: 'updatedAt',
        description: 'The last update date of the product.',
        example: '2025-01-19T22:00:28.374Z',
    })
    @IsDateString()
    readonly updatedAt: Date;

    constructor(product: ProductRepository) {
        this.id = product.id;
        this.name = product.name;
        this.ingredients = product.ingredients;
        this.categoryId = product.categoryId;
        this.price = product.price;
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }
}
