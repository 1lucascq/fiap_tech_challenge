import { Prisma, Customer } from '@prisma/client';

export interface ICustomersRepository {
    create(createCustomerDto: Prisma.CustomerCreateInput): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findOne(uniqueInput: Prisma.CustomerWhereUniqueInput): Promise<Customer | null>;
    update(email: string, data: Prisma.CustomerUpdateInput): Promise<Customer>;
    delete(email: string): Promise<Customer>;
}
