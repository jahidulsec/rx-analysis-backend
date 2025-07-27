DROP TABLE `suvery_medicine`;--> statement-breakpoint
ALTER TABLE `survey` ADD `medicine_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `survey` ADD CONSTRAINT `survey_medicine_id_medicine_id_fk` FOREIGN KEY (`medicine_id`) REFERENCES `medicine`(`id`) ON DELETE restrict ON UPDATE no action;