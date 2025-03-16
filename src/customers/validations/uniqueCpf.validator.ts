import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CustomerValidationService } from './services/customerValidationService';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueCpfValidator implements ValidatorConstraintInterface {
    constructor(private readonly validationService: CustomerValidationService) {}

    async validate(cpf: string): Promise<boolean> {
        const customerExists = await this.validationService.findOne({
            cpf: cpf,
        });
        return !customerExists;
    }

    defaultMessage(): string {
        return 'This CPF is already in use';
    }
}

export const UniqueCpf = (validationOptions: ValidationOptions) => {
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueCpfValidator,
        });
    };
};
