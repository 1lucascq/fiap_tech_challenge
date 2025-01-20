import { ResponseCustomerDto } from './dto/response-customer.dto';
import { Customer } from './entities/customer.entity';
import { Prisma } from '@prisma/client';

// PORT
export interface ICustomersRepository {
    create(customerEntity: Customer): Promise<ResponseCustomerDto>;
    findAll(): Promise<ResponseCustomerDto[]>;
    findOne(uniqueInput: Prisma.CustomerWhereUniqueInput): Promise<ResponseCustomerDto>;
    update(email: string, data: Customer): Promise<ResponseCustomerDto>;
    delete(email: string): Promise<ResponseCustomerDto>;
}
