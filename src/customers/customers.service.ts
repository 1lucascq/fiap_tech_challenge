import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './ports/customers.repository';
import { Prisma } from '@prisma/client';

type uniqueInput = Prisma.CustomerWhereUniqueInput;

@Injectable()
export class CustomersService {
    constructor(private readonly customerRepository: CustomersRepository) {}

    async create(createCustomerDto: CreateCustomerDto) {
        const user = await this.customerRepository.create(createCustomerDto);
        return { error: false, user };
    }

    async findAll() {
        return this.customerRepository.findAll();
    }

    async findOne(uniqueInput: uniqueInput) {
        return this.customerRepository.findOne(uniqueInput);
    }

    async update(data: string, updateCustomerDto: UpdateCustomerDto) {
        return this.customerRepository.update(data, updateCustomerDto);
    }

    async remove(data: string) {
        return this.customerRepository.delete(data);
    }
}
