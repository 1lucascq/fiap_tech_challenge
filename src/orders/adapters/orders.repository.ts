import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { IOrdersRepository, OrderStatus } from '../types';

const orderInclude = {
    customer: {
        select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
        },
    },
    products: {
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                },
            },
        },
    },
} satisfies Prisma.OrderInclude;

@Injectable()
export class OrdersRepository implements IOrdersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(orderEntity: Prisma.OrderCreateInput): Promise<ResponseOrderDto> {
        const order = await this.prisma.order.create({
            data: orderEntity,
            include: orderInclude,
        });

        return new ResponseOrderDto(order);
    }

    async findAll(): Promise<ResponseOrderDto[]> {
        const orders = await this.prisma.order.findMany({
            include: orderInclude,
            orderBy: {
                createdAt: 'asc',
            },
        });

        return orders.map((order) => new ResponseOrderDto(order));
    }

    async findByStatus(status: OrderStatus): Promise<ResponseOrderDto[]> {
        const orders = await this.prisma.order.findMany({
            where: { status },
            include: orderInclude,
            orderBy: {
                createdAt: 'asc',
            },
        });

        return orders.map((order) => new ResponseOrderDto(order));
    }

    async updateStatus(id: number, newStatus: OrderStatus): Promise<ResponseOrderDto> {
        const order = await this.prisma.order.update({
            where: { id },
            data: { status: newStatus },
            include: orderInclude,
        });

        return new ResponseOrderDto(order);
    }

    async findOne(id: number): Promise<ResponseOrderDto> {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: orderInclude,
        });

        return new ResponseOrderDto(order);
    }

    async delete(id: number): Promise<ResponseOrderDto> {
        const order = await this.prisma.order.delete({
            where: { id },
            include: orderInclude,
        });

        return new ResponseOrderDto(order);
    }
}
