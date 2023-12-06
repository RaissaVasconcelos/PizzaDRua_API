-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('CUSTOMER', 'ADMIN');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "observation" TEXT;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "endToEndId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "txid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
