import { Controller, Post, Body, HttpStatus, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderPaymentStatus, OrderStatus } from './domain/interfaces/IOrdersRepository';
import { ResponseOrderDto } from './dto/response-order.dto';
import { CreateOrderUseCase } from './useCases/CreateOrderUseCase';
import { GetOrdersByStatusUseCase } from './useCases/GetOrdersByStatusUseCase';
import { GetOrderUseCase } from './useCases/GetOrderUseCase';
import { UpdateOrderStatusUseCase } from './useCases/UpdateOrderStatusUseCase';
import { DeleteOrderUseCase } from './useCases/DeleteOrderUseCase';
import { GetPaymentStatusUseCase } from './useCases/GetPaymentStatusUseCase';
import { GetOrdersByPriorityUseCase } from './useCases/GetOrdersByPriorityUseCase';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly getOrdersByPriorityUseCase: GetOrdersByPriorityUseCase,
        private readonly getOrdersByStatusUseCase: GetOrdersByStatusUseCase,
        private readonly getOrderUseCase: GetOrderUseCase,
        private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
        private readonly deleteOrderUseCase: DeleteOrderUseCase,
        private readonly getPaymentStatusUseCase: GetPaymentStatusUseCase,
    ) {}

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
        return this.createOrderUseCase.execute(createOrderDto);
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
            return this.getOrdersByStatusUseCase.execute(status);
        }
        return this.getOrdersByPriorityUseCase.execute();
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
        return this.getOrderUseCase.execute(+id);
    }

    @Get('payment/:id')
    @ApiOperation({ summary: 'Get payment status of an order.' })
    @ApiParam({
        name: 'id',
        description: 'Order ID',
        example: 1,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Payment status retrieved successfully.',
        type: ResponseOrderDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Order not found.',
    })
    getPaymentStatus(@Param('id') id: string): Promise<OrderPaymentStatus> {
        return this.getPaymentStatusUseCase.execute(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update the status of an order.' })
    @ApiParam({
        name: 'id',
        description: 'Order ID',
        example: 1,
    })
    @ApiBody({
        description: 'New status for the order',
        type: 'object',
        schema: {
            properties: {
                status: {
                    type: 'string',
                    enum: Object.values(OrderStatus),
                    example: OrderStatus.READY_FOR_PICKUP,
                },
            },
        },
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
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid status provided.',
    })
    updateStatus(@Param('id') id: string, @Body() newStatus: { status: OrderStatus }): Promise<ResponseOrderDto> {
        return this.updateOrderStatusUseCase.execute(+id, newStatus.status);
    }

    @Delete(':id')
    @ApiExcludeEndpoint()
    // @ApiOperation({ summary: 'Delete an order.' })
    // @ApiParam({
    //     name: 'id',
    //     description: 'Order ID',
    //     example: 1,
    // })
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     description: 'Order deleted successfully.',
    //     type: ResponseOrderDto,
    // })
    // @ApiResponse({
    //     status: HttpStatus.NOT_FOUND,
    //     description: 'Order not found.',
    // })
    remove(@Param('id') id: string): Promise<ResponseOrderDto> {
        return this.deleteOrderUseCase.execute(+id);
    }
}
