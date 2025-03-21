import { Module } from '@nestjs/common';
import { FakePayment } from './FakePayment';

@Module({
    providers: [FakePayment],
    exports: [FakePayment],
})
export class PaymentModule {}
