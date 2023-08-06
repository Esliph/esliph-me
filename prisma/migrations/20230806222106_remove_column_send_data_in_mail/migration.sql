/*
  Warnings:

  - You are about to drop the column `send_date` on the `mail` table. All the data in the column will be lost.
  - You are about to drop the column `sentAt` on the `mail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "mail" DROP COLUMN "send_date",
DROP COLUMN "sentAt",
ADD COLUMN     "sent_at" TIMESTAMP(3);
