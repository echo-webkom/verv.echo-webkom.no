import { pgEnum } from 'drizzle-orm/pg-core';
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
export const groupEnum = pgEnum('group_enum', [
	'webkom',
	'tilde',
	'bedkom',
	'makerspace',
	'hyggkom',
	'gnist',
	'esc',
	'bar'
]);
export const roleEnum = pgEnum('role_enum', ['admin', 'leader']);

export type Year = (typeof yearEnum.enumValues)[number];
export type Study = (typeof studyEnum.enumValues)[number];
export type Group = (typeof groupEnum.enumValues)[number];
export type Role = (typeof roleEnum.enumValues)[number];

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
		group: groupEnum('group').notNull(),
		ip: varchar('ip', { length: 255 }).notNull()
	},
	(users) => ({
		groupEmailIndex: uniqueIndex('group_email_index').on(users.group, users.email)
	})
);

export const profiles = pgTable('profiles', {
	id: uuid('id').primaryKey().notNull(),
	role: roleEnum('role'),
	group: groupEnum('group')
});
