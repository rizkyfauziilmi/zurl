/*
  Warnings:

  - You are about to drop the `ShortUrlDemo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShortUrl" DROP CONSTRAINT "ShortUrl_userId_fkey";

-- AlterTable
ALTER TABLE "ShortUrl" ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "ShortUrlDemo";

-- AddForeignKey
ALTER TABLE "ShortUrl" ADD CONSTRAINT "ShortUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
