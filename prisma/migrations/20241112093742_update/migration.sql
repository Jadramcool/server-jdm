-- AlterTable
ALTER TABLE `user` MODIFY `created_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_time` DATETIME(3) NULL;
