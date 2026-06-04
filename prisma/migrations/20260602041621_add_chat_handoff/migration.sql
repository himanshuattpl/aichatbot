-- AlterTable
ALTER TABLE `chatsession` ADD COLUMN `escalatedAt` DATETIME(3) NULL,
    ADD COLUMN `isEscalated` BOOLEAN NOT NULL DEFAULT false;
