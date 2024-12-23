import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueProductNameValidator
    implements ValidatorConstraintInterface
{
    constructor(private readonly productsService: ProductsService) {}

    async validate(
        productName: string,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {
        const productExists = await this.productsService.findOne({
            name: productName,
        });
        return !productExists;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'This product is already registered.';
    }
}

export const UniqueProductName = (validationOptions: ValidationOptions) => {
    return (object: CreateProductDto, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueProductNameValidator,
        });
        ProductsService;
    };
};
