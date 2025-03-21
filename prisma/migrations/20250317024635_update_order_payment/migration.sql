/*
  Warnings:

  - Added the required column `paymentId` to the `OrderPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderPayment" ADD COLUMN     "paymentId" INTEGER NOT NULL;
