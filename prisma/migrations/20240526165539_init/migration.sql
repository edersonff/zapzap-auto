-- DropForeignKey
ALTER TABLE `bulks` DROP FOREIGN KEY `bulks_whatsappId_fkey`;

-- DropForeignKey
ALTER TABLE `conversations` DROP FOREIGN KEY `conversations_chatbotId_fkey`;

-- DropForeignKey
ALTER TABLE `conversations` DROP FOREIGN KEY `conversations_whatsappId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_conversationId_fkey`;

-- DropForeignKey
ALTER TABLE `options` DROP FOREIGN KEY `options_userId_fkey`;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_whatsappId_fkey` FOREIGN KEY (`whatsappId`) REFERENCES `whatsapps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_chatbotId_fkey` FOREIGN KEY (`chatbotId`) REFERENCES `chatbots`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `options_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bulks` ADD CONSTRAINT `bulks_whatsappId_fkey` FOREIGN KEY (`whatsappId`) REFERENCES `whatsapps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
