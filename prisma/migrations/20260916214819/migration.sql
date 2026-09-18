/*
  Warnings:

  - Added the required column `settingid` to the `frame_templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settingid` to the `landing_photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `frame_templates` DROP FOREIGN KEY `frame_templates_id_fkey`;

-- DropForeignKey
ALTER TABLE `landing_photos` DROP FOREIGN KEY `landing_photos_id_fkey`;

-- AlterTable
ALTER TABLE `frame_templates` ADD COLUMN `settingid` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `landing_photos` ADD COLUMN `settingid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `landing_photos` ADD CONSTRAINT `landing_photos_settingid_fkey` FOREIGN KEY (`settingid`) REFERENCES `website_settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `frame_templates` ADD CONSTRAINT `frame_templates_settingid_fkey` FOREIGN KEY (`settingid`) REFERENCES `website_settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
