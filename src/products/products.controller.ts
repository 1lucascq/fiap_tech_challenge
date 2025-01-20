import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseProductDto } from './dto/response-product.dto';

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
            id: 1,
            name: 'X-Burger',
            ingredients: '["Bread","Hamburger","Lettuce","Tomato"]',
            categoryId: 1,
            price: 24.9,
            createdAt: '2025-01-19T22:00:28.374Z',
            updatedAt: '2025-01-19T22:00:28.374Z',
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error creating a product or the product already exists.',
        example: {
            message: ['Product name already exists'],
            error: 'Bad Request',
            statusCode: 400,
        },
    })
    create(@Body() createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Returns all products or products filtered by a given category.' })
    @ApiQuery({
        name: 'category',
        required: false,
        description: 'Filter products by category name (e.g., Sandwich, Drink)',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of products.',
        example: [
            {
                id: 1,
                name: 'X-Burger',
                ingredients: '["Bread","Hamburger","Lettuce","Tomato"]',
                categoryId: 1,
                price: 24.9,
                createdAt: '2025-01-19T22:00:28.374Z',
                updatedAt: '2025-01-19T22:00:28.374Z',
            },
        ],
    })
    findAll(@Query('category') category: string): Promise<ResponseProductDto[]> {
        if (category) {
            return this.productsService.findByCategory(category);
        }
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Returns a specific product by ID.' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product found.',
        example: {
            id: 1,
            name: 'X-Burger',
            ingredients: '["Bread","Hamburger","Lettuce","Tomato"]',
            categoryId: 1,
            price: 24.9,
            createdAt: '2025-01-19T22:00:28.374Z',
            updatedAt: '2025-01-19T22:00:28.374Z',
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product not found.',
    })
    findOne(@Param('id') id: string): Promise<ResponseProductDto> {
        return this.productsService.findOne({ id: +id });
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product by ID.' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product updated successfully.',
        example: {
            id: 1,
            name: 'X-Burger Updated',
            ingredients: '["Bread","Hamburger","Cheese","Lettuce","Tomato"]',
            categoryId: 1,
            price: 26.9,
            createdAt: '2025-01-19T22:00:28.374Z',
            updatedAt: '2025-01-19T22:00:28.374Z',
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product not found.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid product data provided.',
    })
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ResponseProductDto> {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by ID.' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product deleted successfully.',
        example: {
            id: 1,
            name: 'X-Burger',
            ingredients: '["Bread","Hamburger","Lettuce","Tomato"]',
            categoryId: 1,
            price: 24.9,
            createdAt: '2025-01-19T22:00:28.374Z',
            updatedAt: '2025-01-19T22:00:28.374Z',
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product not found.',
    })
    remove(@Param('id') id: string): Promise<ResponseProductDto> {
        return this.productsService.remove(+id);
    }
}
