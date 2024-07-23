CREATE TABLE `field` (
	`id` text PRIMARY KEY NOT NULL,
	`index` integer NOT NULL,
	`form_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`options` blob,
	`required` integer NOT NULL,
	FOREIGN KEY (`form_id`) REFERENCES `form`(`id`) ON UPDATE no action ON DELETE no action
);
