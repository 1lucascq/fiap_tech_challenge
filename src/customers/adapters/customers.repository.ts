import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ICustomersRepository } from '../domain/interfaces/ICustomersRepository';
import { Customer } from '../domain/entities/customer.entity';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(customerEntity: Customer) {
        return this.prisma.customer.create({ data: customerEntity });
    }

    async findAll() {
        return this.prisma.customer.findMany();
    }

    async findOne(uniqueInput: Prisma.CustomerWhereUniqueInput) {
        const key = Object.keys(uniqueInput)[0];
        const value = Object.values(uniqueInput)[0];
        return this.prisma.customer.findUnique({
            where: {
                [key]: value,
            } as Prisma.CustomerWhereUniqueInput,
        });
    }

    async update(cpf: string, createCustomerDto: Prisma.CustomerUpdateInput) {
        return this.prisma.customer.update({
            where: { cpf },
            data: createCustomerDto,
        });
    }

    async delete(cpf: string) {
        return this.prisma.customer.delete({ where: { cpf } });
    }
}
