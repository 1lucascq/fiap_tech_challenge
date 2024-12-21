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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post()
    @ApiOperation({ summary: 'Registra um novo cliente.' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Cliente criado com sucesso.',
        example: {
            error: false,
            user: {
                id: '1',
                name: 'John Doe',
                email: 'johndoe@example.com',
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Erro ao criar um cliente ou o cliente já existe.',
        example: {
            message: ['Este email já está em uso'],
            error: 'Bad Request',
            statusCode: 400,
        },
    })
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retorna todos os clientes.' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de clientes.',
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
        return this.customersService.findAll();
    }

    @Get(':cpf')
    @ApiOperation({ summary: 'Retorna um cliente específico.' })
    @ApiParam({ name: 'cpf', description: 'O CPF do cliente.' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de clientes.',
        example: {
            id: 2,
            email: 'johndoe@example.com',
            cpf: '12345678912',
            name: 'John Doe',
        },
    })
    findOne(@Param('cpf') cpf: string) {
        return this.customersService.findOne({ cpf: cpf });
    }

    @Patch(':cpf')
    @ApiOperation({ summary: 'Atualiza um cliente específico.' })
    @ApiParam({ name: 'cpf', description: 'O cpf do cliente.' })
    update(
        @Param('cpf') cpf: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        return this.customersService.update(cpf, updateCustomerDto);
    }

    @Delete(':cpf')
    @ApiOperation({ summary: 'Remove um cliente específico.' })
    @ApiParam({ name: 'cpf', description: 'O CPF do cliente.' })
    remove(@Param('cpf') cpf: string) {
        return this.customersService.remove(cpf);
    }
}
