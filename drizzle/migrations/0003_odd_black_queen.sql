DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "group_email_index" ON "applications" ("group","email");