import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiOperation({ summary: 'Register a new product.' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Product successfully created.',
        example: {
            error: false,

            product: {
                name: 'X-Burguer',
                category: 'Sandwich',
                ingredients: ['Bread', 'Hamburguer, Lettuce, Tomato'],
                price: 24.9,
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error creating a product or the product already exists.',
        example: {
            message: ['This email is already in use'],
            error: 'Bad Request',
            statusCode: 400,
        },
    })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Returns all products or products filtered by a given category.' })
    @ApiQuery({ name: 'category', required: false, description: 'The category of the product.' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of products.',
        example: [
            {
                id: 2,
                name: 'X-Test',
                ingredients: '["Bread","Tomato","Test"]',
                categoryId: 3,
                price: 35.9,
            },
        ],
    })
    findAll(@Query('category') category: string) {
        if (category) {
            return this.productsService.findByCategory(category);
        } else {
            return this.productsService.findAll();
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Returns a specific Product.' })
    @ApiParam({ name: 'id', description: "The product's id." })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of Products.',
        example: {
            id: 2,
            name: 'X-Test',
            ingredients: '["Bread","Tomato","Test"]',
            categoryId: 3,
            price: 35.9,
        },
    })
    findOne(@Param('id') id: string) {
        return this.productsService.findOne({ id: +id });
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        console.log('hey');
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}
