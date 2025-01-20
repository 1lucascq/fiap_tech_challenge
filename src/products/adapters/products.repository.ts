import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ResponseProductDto } from '../dto/response-product.dto';
import { IProductsRepository } from '../types';

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(productEntity: Prisma.ProductCreateInput): Promise<ResponseProductDto> {
        return this.prisma.product.create({ data: productEntity });
    }

    async findAll(): Promise<ResponseProductDto[]> {
        return this.prisma.product.findMany();
    }

    async findByCategory(category: string): Promise<ResponseProductDto[]> {
        return this.prisma.product.findMany({
            where: {
                category: {
                    name: {
                        equals: category,
                        mode: 'insensitive',
                    },
                },
            },
        });
    }

    async findOne(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<ResponseProductDto | null> {
        const key = Object.keys(uniqueInput)[0];
        const value = Object.values(uniqueInput)[0];
        return this.prisma.product.findUnique({
            where: {
                [key]: value,
            } as Prisma.ProductWhereUniqueInput,
        });
    }

    async update(id: number, createProductDto: Prisma.ProductUpdateInput): Promise<ResponseProductDto> {
        return this.prisma.product.update({
            where: { id },
            data: createProductDto,
        });
    }

    async delete(id: number): Promise<ResponseProductDto> {
        return this.prisma.product.delete({ where: { id } });
    }
}
