/*
  Warnings:

  - The values [UseCase] on the enum `ErrorType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MailStatus" AS ENUM ('Opened', 'Sent', 'Error');

-- AlterEnum
BEGIN;
CREATE TYPE "ErrorType_new" AS ENUM ('Database', 'InternalServer', 'HttpRequest', 'ValidateData');
ALTER TABLE "error" ALTER COLUMN "type" TYPE "ErrorType_new" USING ("type"::text::"ErrorType_new");
ALTER TYPE "ErrorType" RENAME TO "ErrorType_old";
ALTER TYPE "ErrorType_new" RENAME TO "ErrorType";
DROP TYPE "ErrorType_old";
COMMIT;

-- AlterTable
ALTER TABLE "error" ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "notification";

-- DropEnum
DROP TYPE "NotificationStatus";

-- DropEnum
DROP TYPE "NotificationType";

-- CreateTable
CREATE TABLE "mail" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "MailStatus" NOT NULL DEFAULT 'Opened',
    "sender" TEXT NOT NULL,
    "recipients" TEXT[],
    "send_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mail_pkey" PRIMARY KEY ("id")
);
