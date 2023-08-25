CREATE TABLE IF NOT EXISTS "userGroup" (
	"userId" text NOT NULL,
	"group" "group_enum" NOT NULL,
	CONSTRAINT userGroup_userId_group PRIMARY KEY("userId","group")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role_enum";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userGroup" ADD CONSTRAINT "userGroup_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
