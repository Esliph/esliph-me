-- CreateEnum
CREATE TYPE "ErrorType" AS ENUM ('Database', 'InternalServer', 'HttpRequest', 'ValidateData', 'UseCase');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Email');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('Opened', 'Sent', 'Error');

-- CreateTable
CREATE TABLE "privilege" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "privilege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "error" (
    "id" SERIAL NOT NULL,
    "type" "ErrorType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "description" TEXT,
    "stack" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "error_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "error_cause" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT,
    "errorId" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "error_cause_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'Opened',
    "sender" TEXT NOT NULL,
    "recipients" TEXT[],
    "type" "NotificationType" NOT NULL DEFAULT 'Email',
    "send_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "error_cause" ADD CONSTRAINT "error_cause_errorId_fkey" FOREIGN KEY ("errorId") REFERENCES "error"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
