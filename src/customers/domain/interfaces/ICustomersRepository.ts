import { Prisma } from '@prisma/client';
import { Customer } from '../entities/customer.entity';

export interface ICustomersRepository {
    create(customerEntity: Customer): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(uniqueInput: Prisma.CustomerWhereUniqueInput): Promise<any>;
    update(cpf: string, data: Customer): Promise<any>;
    delete(cpf: string): Promise<any>;
}
