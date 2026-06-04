/*
  Warnings:

  - You are about to drop the column `departmentSelected` on the `chatsession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `chatsession` DROP COLUMN `departmentSelected`,
    MODIFY `department` ENUM('GENERAL', 'EMS', 'AGRITECH') NOT NULL;

-- AlterTable
ALTER TABLE `lead` MODIFY `department` ENUM('GENERAL', 'EMS', 'AGRITECH') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `department` ENUM('GENERAL', 'EMS', 'AGRITECH') NULL;
