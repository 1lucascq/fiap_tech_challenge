/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `OrderPayment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderPayment_orderId_key" ON "OrderPayment"("orderId");
