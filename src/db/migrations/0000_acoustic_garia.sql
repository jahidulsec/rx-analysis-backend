CREATE TABLE `doctor` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`full_name` varchar(150) NOT NULL,
	`designation` varchar(50) NOT NULL,
	`mobile` varchar(20) NOT NULL,
	`territory_id` varchar(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `doctor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medicine` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`name` varchar(255) NOT NULL,
	`type` enum('radiant','competitor') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `medicine_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `suvery_medicine` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`survey_id` varchar(36) NOT NULL,
	`medicine` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `suvery_medicine_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `survey` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`doctor_id` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `survey_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `territory` (
	`sap_territory_id` varchar(10) NOT NULL,
	`zone` varchar(50) NOT NULL,
	`region` varchar(100) NOT NULL,
	`territory` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `territory_sap_territory_id` PRIMARY KEY(`sap_territory_id`)
);
--> statement-breakpoint
CREATE TABLE `admin` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`full_name` varchar(150) NOT NULL,
	`username` varchar(150) NOT NULL,
	`password` varchar(100) NOT NULL,
	`admin_role` enum('superadmin','chq-admin','mio') NOT NULL DEFAULT 'mio',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`),
	CONSTRAINT `username_idx` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `doctor` ADD CONSTRAINT `doctor_territory_id_territory_sap_territory_id_fk` FOREIGN KEY (`territory_id`) REFERENCES `territory`(`sap_territory_id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `suvery_medicine` ADD CONSTRAINT `suvery_medicine_survey_id_survey_id_fk` FOREIGN KEY (`survey_id`) REFERENCES `survey`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `suvery_medicine` ADD CONSTRAINT `suvery_medicine_medicine_medicine_id_fk` FOREIGN KEY (`medicine`) REFERENCES `medicine`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `survey` ADD CONSTRAINT `survey_doctor_id_doctor_id_fk` FOREIGN KEY (`doctor_id`) REFERENCES `doctor`(`id`) ON DELETE restrict ON UPDATE no action;