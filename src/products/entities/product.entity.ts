import { CreateProductDto } from '../dto/create-product.dto';

export class Product {
    name: string;
    ingredients: string;
    price: number;
    category: {
        connectOrCreate: {
            where: { name: string };
            create: { name: string };
        };
    };

    constructor(createProductDto: CreateProductDto) {
        this.name = createProductDto.name;
        this.ingredients = JSON.stringify(createProductDto.ingredients) || JSON.stringify([]);
        this.price = createProductDto.price;
        this.category = {
            connectOrCreate: {
                where: { name: createProductDto.category },
                create: { name: createProductDto.category },
            },
        };
    }
}
