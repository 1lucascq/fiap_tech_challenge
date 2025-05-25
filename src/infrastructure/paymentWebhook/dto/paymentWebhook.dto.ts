import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../../orders/domain/interfaces/IOrdersRepository';

export class PaymentWebhookDto {
    @ApiProperty({
        description: "The payment provider's transaction ID",
        example: 'tx_123456789',
    })
    @IsNumber()
    readonly paymentId: number;

    @ApiProperty({
        description: 'The order ID in your system',
        example: 5,
    })
    @IsNumber()
    readonly orderId: number;

    @ApiProperty({
        description: 'Payment status from provider',
        enum: PaymentStatus,
        example: PaymentStatus.PAID,
    })
    @IsEnum(PaymentStatus)
    readonly status: PaymentStatus;

    @ApiProperty({
        description: 'Payment provider name',
        example: 'stripe',
    })
    @IsString()
    readonly provider: string;
}
