CREATE TABLE `invitation` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`workspace_id` text NOT NULL,
	`created_at` integer NOT NULL
);
