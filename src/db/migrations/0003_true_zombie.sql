CREATE TABLE `survey_medicine` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`survey_id` varchar(36) NOT NULL,
	`medicine_id` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `survey_medicine_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `survey` DROP FOREIGN KEY `survey_medicine_id_medicine_id_fk`;
--> statement-breakpoint
ALTER TABLE `survey_medicine` ADD CONSTRAINT `survey_medicine_survey_id_survey_id_fk` FOREIGN KEY (`survey_id`) REFERENCES `survey`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `survey_medicine` ADD CONSTRAINT `survey_medicine_medicine_id_medicine_id_fk` FOREIGN KEY (`medicine_id`) REFERENCES `medicine`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `survey` DROP COLUMN `medicine_id`;