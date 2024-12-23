import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueProductName } from '../validations/uniqueProductName.validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'The name of the product.',
        example: 'X-Everything',
    })
    @IsString()
    @UniqueProductName({ message: 'This product is already registered.' })
    readonly name: string;

    @ApiProperty({
        description: 'The category of the product.',
        example: 'Sandwich',
    })
    @IsString()
    readonly category: string;

    @ApiProperty({
        description: 'The ingredients of the product.',
        example: '[Bread, Burger, Cheese, Lettuce, Tomato, Egg]',
    })
    @IsArray()
    @IsOptional()
    readonly ingredients: string[];

    @ApiProperty({
        description: 'The final price of the product.',
        example: '23.90',
    })
    @IsNumber()
    readonly price: number;
}
