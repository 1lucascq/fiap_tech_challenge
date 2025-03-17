import { CreateOrderDto, OrderProduct } from '../../dto/create-order.dto';

export class Order {
    customer: {
        connect: {
            id: number;
        };
    } | null;
    total: number;
    status: string;
    products: {
        create: Array<OrderProduct>;
    };

    constructor(createOrderDto: CreateOrderDto) {
        if (createOrderDto.customerId) {
            this.customer = {
                connect: {
                    id: createOrderDto.customerId,
                },
            };
        }
        this.total = createOrderDto.total;
        this.status = 'CREATED';
        this.products = {
            create: createOrderDto.products.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
            })),
        };
    }
}
