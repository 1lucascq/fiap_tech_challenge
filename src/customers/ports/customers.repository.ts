import { Injectable } from '@nestjs/common';
import { Prisma, Customer } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ICustomersRepository } from '../types';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCustomerDto: Prisma.CustomerCreateInput): Promise<Customer> {
        return this.prisma.customer.create({ data: createCustomerDto });
    }

    async findAll(): Promise<Customer[]> {
        return this.prisma.customer.findMany();
    }

    async findOne(uniqueInput: Prisma.CustomerWhereUniqueInput): Promise<Customer | null> {
        const key = Object.keys(uniqueInput)[0];
        const value = Object.values(uniqueInput)[0];
        return this.prisma.customer.findUnique({
            where: {
                [key]: value,
            } as Prisma.CustomerWhereUniqueInput,
        });
    }

    async update(email: string, createCustomerDto: Prisma.CustomerUpdateInput): Promise<Customer> {
        return this.prisma.customer.update({
            where: { email },
            data: createCustomerDto,
        });
    }

    async delete(email: string): Promise<Customer> {
        return this.prisma.customer.delete({ where: { email } });
    }
}
