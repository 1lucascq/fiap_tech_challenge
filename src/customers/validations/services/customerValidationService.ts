import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ICustomersRepository } from '../../domain/interfaces/ICustomersRepository';

@Injectable()
export class CustomerValidationService {
    constructor(
        @Inject('ICustomersRepository')
        private readonly customersRepository: ICustomersRepository,
    ) {}

    async findOne(uniqueInput: Prisma.CustomerWhereUniqueInput) {
        return this.customersRepository.findOne(uniqueInput);
    }
}
