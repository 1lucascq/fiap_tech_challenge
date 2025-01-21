import { Inject, Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './adapters/customers.repository';
import { Prisma } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseCustomerDto } from './dto/response-customer.dto';
import { Customer } from './entities/customer.entity';

type uniqueInput = Prisma.CustomerWhereUniqueInput;

@Injectable()
export class CustomersService {
    constructor(
        @Inject('ICustomersRepository')
        private readonly customerRepository: CustomersRepository,
    ) {}

    async create(createCustomerDto: CreateCustomerDto): Promise<ResponseCustomerDto> {
        const customerEntity = new Customer(createCustomerDto);
        const customer = await this.customerRepository.create(customerEntity);

        return customer;
    }

    async findAll(): Promise<ResponseCustomerDto[]> {
        return this.customerRepository.findAll();
    }

    async findOne(uniqueInput: uniqueInput): Promise<ResponseCustomerDto> {
        return this.customerRepository.findOne(uniqueInput);
    }

    async update(cpf: string, updateCustomerDto: UpdateCustomerDto): Promise<ResponseCustomerDto> {
        return this.customerRepository.update(cpf, updateCustomerDto);
    }

    async remove(data: string): Promise<ResponseCustomerDto> {
        return this.customerRepository.delete(data);
    }
}
