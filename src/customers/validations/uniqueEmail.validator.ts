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
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(private readonly validationService: CustomerValidationService) {}

    async validate(email: string): Promise<boolean> {
        const customerExists = await this.validationService.findOne({
            email: email,
        });
        return !customerExists;
    }

    defaultMessage(): string {
        return 'This email is already in use';
    }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator,
        });
    };
};
