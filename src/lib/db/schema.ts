import { boolean, pgEnum } from 'drizzle-orm/pg-core';
import { pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const yearEnum = pgEnum('year_enum', ['1', '2', '3', '4', '5']);
export const studyEnum = pgEnum('study_enum', [
	'DTEK',
	'DSIK',
	'DVIT',
	'BINF',
	'IMO',
	'INF',
	'PROG',
	'DSC',
	'OTHER'
]);

export const applications = pgTable(
	'applications',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		name: varchar('name', { length: 255 }).notNull(),
		email: varchar('email', { length: 255 }).notNull(),
		yearOfStudy: yearEnum('year').notNull(),
		fieldOfStudy: studyEnum('study').notNull(),
		reason: text('body').notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		ip: varchar('ip', { length: 255 }).notNull()
	},
	(users) => ({
		emailIndex: uniqueIndex('email_idx').on(users.email)
	})
);

export const profiles = pgTable('profiles', {
	id: uuid('id').primaryKey().notNull(),
	isWebkom: boolean('is_webkom').default(false).notNull()
});