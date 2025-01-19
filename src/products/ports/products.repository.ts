import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(productEntity: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({ data: productEntity });
    }

    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async findByCategory(category: string): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: {
                category: {
                    name: {
                        equals: category.charAt(0).toUpperCase() + category.slice(1),
                        // equals: category,
                        // mode: 'insensitive',
                    },
                },
            },
        });
    }

    async findOne(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<Product | null> {
        const key = Object.keys(uniqueInput)[0];
        const value = Object.values(uniqueInput)[0];
        return this.prisma.product.findUnique({
            where: {
                [key]: value,
            } as Prisma.ProductWhereUniqueInput,
        });
    }

    async update(id: number, createProductDto: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prisma.product.update({
            where: { id },
            data: createProductDto,
        });
    }

    async delete(id: number): Promise<Product> {
        return this.prisma.product.delete({ where: { id } });
    }
}
