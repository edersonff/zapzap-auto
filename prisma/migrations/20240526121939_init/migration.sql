/*
  Warnings:

  - You are about to drop the column `BulkId` on the `conversations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `conversations` DROP FOREIGN KEY `conversations_BulkId_fkey`;

-- AlterTable
ALTER TABLE `conversations` DROP COLUMN `BulkId`,
    ADD COLUMN `bulkId` INTEGER NULL;

-- CreateTable
CREATE TABLE `usages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `totalMessages` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_bulkId_fkey` FOREIGN KEY (`bulkId`) REFERENCES `bulks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usages` ADD CONSTRAINT `usages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
