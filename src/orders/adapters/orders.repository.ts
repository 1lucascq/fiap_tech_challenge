import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { IOrdersRepository, OrderStatus } from '../domain/interfaces/IOrdersRepository';
import { OrderPresenter } from '../presenter/orderPresenter';

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
    constructor(
        private readonly prisma: PrismaService,
        private readonly orderPresenter: OrderPresenter,
    ) {}

    async create(orderEntity: Prisma.OrderCreateInput): Promise<ResponseOrderDto> {
        const order = await this.prisma.order.create({
            data: orderEntity,
            include: orderInclude,
        });

        return this.orderPresenter.toResponseDto(order);
    }

    async findAll(): Promise<ResponseOrderDto[]> {
        const orders = await this.prisma.order.findMany({
            include: orderInclude,
            orderBy: {
                createdAt: 'asc',
            },
        });

        return this.orderPresenter.toResponseDtoList(orders);
    }

    async findByStatus(status: OrderStatus): Promise<ResponseOrderDto[]> {
        const orders = await this.prisma.order.findMany({
            where: { status },
            include: orderInclude,
            orderBy: {
                createdAt: 'asc',
            },
        });

        return this.orderPresenter.toResponseDtoList(orders);
    }

    async updateStatus(id: number, newStatus: OrderStatus): Promise<ResponseOrderDto> {
        const order = await this.prisma.order.update({
            where: { id },
            data: { status: newStatus },
            include: orderInclude,
        });

        return this.orderPresenter.toResponseDto(order);
    }

    async findOne(id: number): Promise<ResponseOrderDto> {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: orderInclude,
        });

        return this.orderPresenter.toResponseDto(order);
    }

    async delete(id: number): Promise<ResponseOrderDto> {
        const order = await this.prisma.order.delete({
            where: { id },
            include: orderInclude,
        });

        return this.orderPresenter.toResponseDto(order);
    }
}
