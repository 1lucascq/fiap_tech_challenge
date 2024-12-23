import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    @ApiOperation({ summary: 'Returns all customers.' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of customers.',
        example: [
            {
                id: 1,
                email: 'johndoe@example.com',
                cpf: '12345678911',
                name: 'John Doe',
            },
        ],
    })
    findAll() {
        return this.productsService.findAll();
    }

    //     @Get(':cpf')
    //     @ApiOperation({ summary: 'Returns a specific customer.' })
    //     @ApiParam({ name: 'cpf', description: 'The customer\'s CPF.' })
    //     @ApiResponse({
    //         status: HttpStatus.OK,
    //         description: 'List of customers.',
    //         example: {
    //             id: 2,
    //             email: 'johndoe@example.com',
    //             cpf: '12345678912',
    //             name: 'John Doe',
    //         },
    //     })
    //     findOne(@Param('cpf') cpf: string) {
    //         return this.productsService.findOne({ cpf: cpf });
    //     }

    //     @Patch(':id')
    //     update(
    //         @Param('id') id: string,
    //         @Body() updateProductDto: UpdateProductDto,
    //     ) {
    //         return this.productsService.update(+id, updateProductDto);
    //     }

    //     @Delete(':id')
    //     remove(@Param('id') id: string) {
    //         return this.productsService.remove(+id);
    //     }
}
