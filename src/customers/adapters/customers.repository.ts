import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ICustomersRepository } from '../types';
import { ResponseCustomerDto } from '../dto/response-customer.dto';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCustomerDto: Prisma.CustomerCreateInput): Promise<ResponseCustomerDto> {
        const customer = await this.prisma.customer.create({ data: createCustomerDto });
        const customerResponse = new ResponseCustomerDto(customer);
        return customerResponse;
    }

    async findAll(): Promise<ResponseCustomerDto[]> {
        return this.prisma.customer.findMany();
    }

    async findOne(uniqueInput: Prisma.CustomerWhereUniqueInput): Promise<ResponseCustomerDto | null> {
        const key = Object.keys(uniqueInput)[0];
        const value = Object.values(uniqueInput)[0];
        return this.prisma.customer.findUnique({
            where: {
                [key]: value,
            } as Prisma.CustomerWhereUniqueInput,
        });
    }

    async update(cpf: string, createCustomerDto: Prisma.CustomerUpdateInput): Promise<ResponseCustomerDto> {
        return this.prisma.customer.update({
            where: { cpf },
            data: createCustomerDto,
        });
    }

    async delete(cpf: string): Promise<ResponseCustomerDto> {
        return this.prisma.customer.delete({ where: { cpf } });
    }
}
