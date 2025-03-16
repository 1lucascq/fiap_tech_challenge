import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProductValidationService } from './services/productValidationService';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueProductNameValidator implements ValidatorConstraintInterface {
    constructor(private readonly validationService: ProductValidationService) {}

    async validate(productName: string): Promise<boolean> {
        const productExists = await this.validationService.findOne({
            name: productName,
        });
        return !productExists;
    }

    defaultMessage(): string {
        return 'This product name is already in use';
    }
}

export const UniqueProductName = (validationOptions: ValidationOptions) => {
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueProductNameValidator,
        });
    };
};
