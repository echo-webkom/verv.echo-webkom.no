CREATE TABLE `question` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`label` text NOT NULL,
	`description` text,
	`required` integer DEFAULT false NOT NULL,
	`placeholder` text,
	`order` integer NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `groupId_idx` ON `question` (`group_id`);