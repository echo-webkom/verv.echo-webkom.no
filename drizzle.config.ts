import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
	out: './drizzle/migrations',
	schema: './src/lib/db/schema.ts',
	driver: 'pg',
	breakpoints: true,
	strict: true,
	verbose: true,
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string
	}
} satisfies Config;
