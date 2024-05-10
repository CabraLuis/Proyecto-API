-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `developer` VARCHAR(150) NOT NULL,
    `distributor` VARCHAR(150) NOT NULL,
    `genre` VARCHAR(100) NOT NULL,
    `released` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
