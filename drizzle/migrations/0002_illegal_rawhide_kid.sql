DO $$ BEGIN
 CREATE TYPE "group_enum" AS ENUM('webkom', 'tilde', 'bedkom', 'makerspace', 'hyggkom', 'gnist', 'esc', 'bar');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role_enum" AS ENUM('admin', 'leader');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "group" "group_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "role" "role_enum";--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "group" "group_enum";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "is_webkom";