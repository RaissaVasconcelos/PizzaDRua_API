/*
  Warnings:

  - You are about to drop the column `image` on the `Pizza` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pizza" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;
