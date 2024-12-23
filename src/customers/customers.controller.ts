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
	@ApiOperation({ summary: 'Register a new customer.' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Customer successfully created.',
		example: {
			error: false,
			customer: {
				id: '1',
				name: 'John Doe',
				email: 'johndoe@example.com',
			},
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
	create(@Body() createCustomerDto: CreateCustomerDto) {
		return this.customersService.create(createCustomerDto);
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
		return this.customersService.findAll();
	}

	@Get(':cpf')
	@ApiOperation({ summary: 'Returns a specific customer.' })
	@ApiParam({ name: 'cpf', description: 'The customer\'s CPF.' })
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
	findOne(@Param('cpf') cpf: string) {
		return this.customersService.findOne({ cpf: cpf });
	}

	@Patch(':cpf')
	@ApiOperation({ summary: 'Updates a specific customer.' })
	@ApiParam({ name: 'cpf', description: 'The customer\'s CPF.' })
	update(
		@Param('cpf') cpf: string,
		@Body() updateCustomerDto: UpdateCustomerDto,
	) {
		return this.customersService.update(cpf, updateCustomerDto);
	}

	@Delete(':cpf')
	@ApiOperation({ summary: 'Removes a specific customer.' })
	@ApiParam({ name: 'cpf', description: 'The customer\'s CPF.' })
	remove(@Param('cpf') cpf: string) {
		return this.customersService.remove(cpf);
	}
}
