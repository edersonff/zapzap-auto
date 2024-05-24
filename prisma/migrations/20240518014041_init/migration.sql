/*
  Warnings:

  - Added the required column `whatsappId` to the `bulks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bulks` ADD COLUMN `whatsappId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `bulks` ADD CONSTRAINT `bulks_whatsappId_fkey` FOREIGN KEY (`whatsappId`) REFERENCES `whatsapps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
