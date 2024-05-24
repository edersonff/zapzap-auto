/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `subscriptions_userId_key` ON `subscriptions`(`userId`);
