import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ResponseCustomerDto } from './dto/response-customer.dto';
import { CreateCustomerUseCase } from './useCases/CreateCustomerUseCase';
import { GetAllCustomersUseCase } from './useCases/GetAllCustomersUseCase';
import { GetCustomerUseCase } from './useCases/GetCustomerUseCase';
import { UpdateCustomerUseCase } from './useCases/UpdateCustomerUseCase';
import { DeleteCustomerUseCase } from './useCases/DeleteCustomerUseCase';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly getAllCustomersUseCase: GetAllCustomersUseCase,
        private readonly getCustomerUseCase: GetCustomerUseCase,
        private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Register a new customer.' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Customer successfully created.',
        example: {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@example.com',
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error creating a customer or the customer already exists.',
        example: {
            message: ['This email is already in use'],
            error: 'Bad Request',
            statusCode: 400,
        },
    })
    create(@Body() createCustomerDto: CreateCustomerDto): Promise<ResponseCustomerDto> {
        return this.createCustomerUseCase.execute(createCustomerDto);
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
    findAll(): Promise<ResponseCustomerDto[]> {
        return this.getAllCustomersUseCase.execute();
    }

    @Get(':cpf')
    @ApiOperation({ summary: 'Returns a specific customer.' })
    @ApiParam({ name: 'cpf', description: "The customer's CPF." })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Customer details.',
        example: {
            id: 2,
            email: 'johndoe@example.com',
            cpf: '12345678912',
            name: 'John Doe',
        },
    })
    findOne(@Param('cpf') cpf: string): Promise<ResponseCustomerDto> {
        return this.getCustomerUseCase.execute({ cpf });
    }

    @Put(':cpf')
    @ApiOperation({ summary: 'Updates a specific customer.' })
    @ApiParam({ name: 'cpf', description: "The customer's CPF." })
    update(@Param('cpf') cpf: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<ResponseCustomerDto> {
        return this.updateCustomerUseCase.execute(cpf, updateCustomerDto);
    }

    @Delete(':cpf')
    @ApiOperation({ summary: 'Removes a specific customer.' })
    @ApiParam({ name: 'cpf', description: "The customer's CPF." })
    remove(@Param('cpf') cpf: string): Promise<ResponseCustomerDto> {
        return this.deleteCustomerUseCase.execute(cpf);
    }
}
