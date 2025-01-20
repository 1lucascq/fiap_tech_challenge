import { Controller, Post, Body, HttpStatus, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderStatus } from './types';
import { ResponseOrderDto } from './dto/response-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order.' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Order successfully created.',
        type: ResponseOrderDto,
        example: {
            id: 1,
            status: OrderStatus.CREATED,
            customer: {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                cpf: '12345678901',
            },
            products: [
                {
                    id: 1,
                    name: 'X-Burger',
                    price: 25.9,
                    quantity: 2,
                },
            ],
            total: 51.8,
            createdAt: '2025-01-19T22:00:28.374Z',
            updatedAt: '2025-01-19T22:00:28.374Z',
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid order data provided.',
    })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all orders or filter by status.' })
    @ApiQuery({
        name: 'status',
        required: false,
        enum: OrderStatus,
        description: 'Filter orders by status',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of orders retrieved successfully.',
        type: [ResponseOrderDto],
    })
    findAll(@Query('status') status: OrderStatus): Promise<ResponseOrderDto[]> {
        if (status) {
            return this.ordersService.findByStatus(status);
        }
        return this.ordersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find order by ID.' })
    @ApiParam({
        name: 'id',
        description: 'Order ID',
        example: 1,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Order found.',
        type: ResponseOrderDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Order not found.',
    })
    findOne(@Param('id') id: string): Promise<ResponseOrderDto> {
        return this.ordersService.findOne(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update order status.' })
    @ApiParam({
        name: 'id',
        description: 'Order ID',
        example: 1,
    })
    @ApiBody({
        description: 'New status for the order',
        enum: OrderStatus,
        example: OrderStatus.IN_PROGRESS,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Order status updated successfully.',
        type: ResponseOrderDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Order not found.',
    })
    updateStatus(@Param('id') id: string, @Body() newStatus: OrderStatus): Promise<ResponseOrderDto> {
        return this.ordersService.updateStatus(+id, newStatus);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an order.' })
    @ApiParam({
        name: 'id',
        description: 'Order ID',
        example: 1,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Order deleted successfully.',
        type: ResponseOrderDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Order not found.',
    })
    remove(@Param('id') id: string): Promise<ResponseOrderDto> {
        return this.ordersService.remove(+id);
    }
}
