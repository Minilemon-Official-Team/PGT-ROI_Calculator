-- CreateTable
CREATE TABLE `Equipments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipment_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinancialDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `initial_investment` INTEGER NOT NULL,
    `expected_monthly_revenue` INTEGER NOT NULL,
    `monthly_operating_cost` INTEGER NOT NULL,
    `timeframe` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BusinessStrategy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `strategy_name` VARCHAR(191) NOT NULL,
    `funding_option` VARCHAR(191) NULL,
    `business_model` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BusinessStrategyEquipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `businessStrategyId` INTEGER NOT NULL,
    `equipmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ROIResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roi_percentage` DOUBLE NOT NULL,
    `net_profit` INTEGER NOT NULL,
    `payback_period_years` DOUBLE NOT NULL,
    `total_revenue` INTEGER NOT NULL,
    `total_operating_cost` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `financialDetailsId` INTEGER NOT NULL,
    `businessStrategyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BusinessStrategyEquipment` ADD CONSTRAINT `BusinessStrategyEquipment_businessStrategyId_fkey` FOREIGN KEY (`businessStrategyId`) REFERENCES `BusinessStrategy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BusinessStrategyEquipment` ADD CONSTRAINT `BusinessStrategyEquipment_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ROIResult` ADD CONSTRAINT `ROIResult_financialDetailsId_fkey` FOREIGN KEY (`financialDetailsId`) REFERENCES `FinancialDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ROIResult` ADD CONSTRAINT `ROIResult_businessStrategyId_fkey` FOREIGN KEY (`businessStrategyId`) REFERENCES `BusinessStrategy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
