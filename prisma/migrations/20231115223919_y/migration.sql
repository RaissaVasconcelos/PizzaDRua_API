-- AlterEnum
ALTER TYPE "STATUS" ADD VALUE 'AWAITING_WITHDRAWAL';

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "withdrawalName" TEXT;
