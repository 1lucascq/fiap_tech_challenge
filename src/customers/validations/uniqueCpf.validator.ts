import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueCpfValidator implements ValidatorConstraintInterface {
    constructor(private readonly customersService: CustomersService) {}

    async validate(
        cpf: string,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {
        const customerExists = await this.customersService.findOne({
            cpf: cpf,
        });
        return !customerExists;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Este cpf já está em uso';
    }
}

export const UniqueCpf = (validationOptions: ValidationOptions) => {
    return (object: CreateCustomerDto, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueCpfValidator,
        });
    };
};
