import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(private readonly customersService: CustomersService) {}

    async validate(
        email: string,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {
        const customerExists = await this.customersService.findOne({
            email: email,
        });
        return !customerExists;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
		return 'This email is already in use';
    }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator,
        });
    };
};
