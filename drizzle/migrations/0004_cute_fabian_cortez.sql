DROP INDEX IF EXISTS "group_email_index";--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "semester" varchar(3) DEFAULT '23H' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "group_email_semester_index" ON "applications" ("group","email","semester");