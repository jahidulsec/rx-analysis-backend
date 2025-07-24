RENAME TABLE `admin` TO `user`;--> statement-breakpoint
ALTER TABLE `user` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `user` ADD PRIMARY KEY(`id`);