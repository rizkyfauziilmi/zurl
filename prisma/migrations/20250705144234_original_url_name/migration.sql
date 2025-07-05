/*
  Warnings:

  - You are about to drop the column `long_url` on the `ShortUrl` table. All the data in the column will be lost.
  - Added the required column `original_url` to the `ShortUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShortUrl" DROP COLUMN "long_url",
ADD COLUMN     "original_url" TEXT NOT NULL;
