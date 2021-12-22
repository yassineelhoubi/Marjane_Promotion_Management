/*
  Warnings:

  - A unique constraint covering the columns `[idCenter]` on the table `SubAdmin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idCenter` to the `SubAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subadmin` ADD COLUMN `idCenter` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Center` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Center_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `SubAdmin_idCenter_key` ON `SubAdmin`(`idCenter`);

-- AddForeignKey
ALTER TABLE `SubAdmin` ADD CONSTRAINT `SubAdmin_idCenter_fkey` FOREIGN KEY (`idCenter`) REFERENCES `Center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
